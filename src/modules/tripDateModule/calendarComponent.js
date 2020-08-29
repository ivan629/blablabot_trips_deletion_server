import { chunk, last } from 'lodash';
import moment from 'moment';
import { createAction } from '../../common/utils/utils';
import { MONTHS, WEEK_DAYS } from './tripDateConstants';
import { MONTH_DOWN, MONTH_UP, DATE_CHANGED } from '../../common/constants/commonСonstants';

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

    checkIfTimeIsValid(year, month, day, currentDateMilliseconds) {
        const calendarItemDateMilliseconds = moment(`${day + 1}-${month}-${year}`, 'DD-MM-YYYY').valueOf();

        return calendarItemDateMilliseconds > currentDateMilliseconds;
    };

    getCurrentMonth() {
        return MONTHS[this.getCurrentMonthNumber()];
    };

    getMonthPaginationButtons() {
        return [
            {text: '⬅️', callback_data: createAction(MONTH_DOWN)},
            {text: ' ', callback_data: 'none'},
            {text: '➡️', callback_data: createAction(MONTH_UP)},
        ]
    }

    getCalendar(customMonthNumber, newYear) {
        const shouldIncludeReplyMarkup = !customMonthNumber;
        const currentMonth = customMonthNumber ? MONTHS[customMonthNumber - 1] : this.getCurrentMonth();
        const currentMonthNumber = customMonthNumber || this.getCurrentMonthNumber();
        const currentYear = newYear || this.getCurrentYear();

        const monthButton = [{text: `${currentMonth} ${currentYear}`, callback_data: 'none'}];
        const days = daysInMonth(currentMonthNumber, currentYear);
        const currentDateMilliseconds = Date.now();
        const daysButtons = new Array(days).fill(null).reduce((result, value, index) => {
        const isTimeEnable = this.checkIfTimeIsValid(currentYear, currentMonthNumber, index, currentDateMilliseconds);

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
                        this.getMonthPaginationButtons(),
                    ]
                }
            }
            : {
                inline_keyboard: [
                    monthButton,
                    WEEK_DAYS,
                    ...chunkedDaysArray,
                    this.getMonthPaginationButtons(),
                ]
            }
    }
}

export default CalendarComponent;
