import { chunk, last } from 'lodash';
import moment from 'moment';
import { createAction } from '../../common/utils/utils';
import { MONTHS, WEEK_DAYS } from './tripDateConstants';
import { MONTH_DOWN, MONTH_UP, DATE_CHANGED } from '../../common/constants/commonСonstants';
import { getIsStartDateCreatingCompleted, getNotCompletedTrip } from '../../services/helpers';

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

class CalendarComponent {
    constructor() {}

    getCurrentMonthNumber() {
        return new Date().getMonth() + 1
    };

    getCurrentYear() {
        return new Date().getFullYear();
    };

    getDateMilliseconds(day, month, year) {
        return moment(`${day + 1}-${month}-${year}`, 'DD-MM-YYYY').valueOf();
    };

    getOsGoToPreviousMonthButtonEnabled (currentCalendarMonth) {
        return currentCalendarMonth !== this.getCurrentMonthNumber();
    }

    checkIfTimeIsValid({ year, month, day, minDateMillisecondsThreshold }) {
        return this.getDateMilliseconds(day, month, year) > minDateMillisecondsThreshold;
    };

    getCurrentMonth() {
        return MONTHS[this.getCurrentMonthNumber() - 1];
    };

    getMonthPaginationButtons(currentCalendarMonth, shouldDisableGoToNextMonthButton) {
        const isGoToPreviousMonthButtonEnabled  = this.getOsGoToPreviousMonthButtonEnabled(currentCalendarMonth);
        const goToPreviousMonthButton = {
            text: `${isGoToPreviousMonthButtonEnabled ? '⬅️' : '🤷‍♀️'}`,
            callback_data: isGoToPreviousMonthButtonEnabled ? createAction(MONTH_DOWN) : 'None',
        };
        const goToNextMonthButton = {
            text: `${shouldDisableGoToNextMonthButton ? '🤷‍♀️' : '➡️'}`,
            callback_data: shouldDisableGoToNextMonthButton ? 'None' : createAction(MONTH_UP),
        };

        return [
            goToPreviousMonthButton,
            {text: ' ', callback_data: 'none'},
            goToNextMonthButton,
        ]
    }

    async getCalendar({
                    chat_id,
                    newYear,
                    customMonthNumber,
                    shouldDisableGoToNextMonthButton,
                }) {
        const shouldIncludeReplyMarkup = !customMonthNumber;
        const currentCalendarMonth = customMonthNumber ? MONTHS[customMonthNumber - 1] : this.getCurrentMonth();
        const currentMonthNumber = customMonthNumber || this.getCurrentMonthNumber();
        const currentYear = newYear || this.getCurrentYear();

        const monthButton = [{text: `${currentCalendarMonth} ${currentYear}`, callback_data: 'none'}];
        const days = daysInMonth(currentMonthNumber, currentYear);

        let minDateMillisecondsThreshold = Date.now();
        const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);

        if (isStartDateCreatingCompleted) {
            const { start_date: { start_date_day, start_date_year, start_date_month } } = await getNotCompletedTrip(chat_id);
            // we allow to set the same trip end dsy, with min hours threshold
            const minDayThreshold = start_date_day - 1;
            minDateMillisecondsThreshold = this.getDateMilliseconds(minDayThreshold, start_date_month, start_date_year);
        }

        const daysButtons = new Array(days).fill(null).reduce((result, value, index) => {
        const isTimeEnable = this.checkIfTimeIsValid({
            chat_id,
            day: index,
            year: currentYear,
            month: currentMonthNumber,
            minDateMillisecondsThreshold,
        });

            if (index > 0) {
                result.push({
                    text: isTimeEnable ? index : '🚫',
                    callback_data: isTimeEnable ? createAction(DATE_CHANGED, index) : 'none',
                });
            }

            return result;
        }, []);

        const chunkedDaysArray = chunk(daysButtons, WEEK_DAYS.length);

        if ((WEEK_DAYS.length - last(chunkedDaysArray).length) > 0) {
            chunkedDaysArray.push([...last(chunkedDaysArray), ...new Array(WEEK_DAYS.length - last(chunkedDaysArray).length).fill({
                text: ' ',
                callback_data: 'none'
            })]);
            chunkedDaysArray.splice(-2, 1);
        }

        return shouldIncludeReplyMarkup
            ? {
                reply_markup: {
                    inline_keyboard: [
                        monthButton,
                        WEEK_DAYS,
                        ...chunkedDaysArray,
                        this.getMonthPaginationButtons(currentMonthNumber, shouldDisableGoToNextMonthButton),
                    ]
                }
            }
            : {
                inline_keyboard: [
                    monthButton,
                    WEEK_DAYS,
                    ...chunkedDaysArray,
                    this.getMonthPaginationButtons(currentMonthNumber, shouldDisableGoToNextMonthButton),
                ]
            }
    }
}

export default CalendarComponent;