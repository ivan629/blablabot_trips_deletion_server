import moment from 'moment';
import {createAction, sendMessage} from '../../../common/utils/utils';
import { calendarKeyboard } from '../../keyboards/keyboards';
import { getFindTripDateText } from '../../../services/helpers';
import { MONTHS, WEEK_DAYS } from '../../../common/constants/calendarConstants';
import {
    FIND_TRIP_MONTH_UP,
    FIND_TRIP_MONTH_DOWN,
    FIND_TRIP_DATE_CHANGED,
    FIND_TRIP_SEARCH_TRIPS_BLOCKED,
    CALENDAR_CONGRATS_MESSAGE_START,
    FIND_TRIP_CONGRATS_MESSAGE_STOP,
} from '../../../common/constants/commonСonstants';
import findTripCalendarComponent from './findTripCalendarComponent';

export const sendFindTripCalendar = async (bot, chat_id) => {
    const calendar = await findTripCalendarComponent({ chat_id });
    sendMessage(bot, chat_id, CALENDAR_CONGRATS_MESSAGE_START, { parse_mode: 'HTML', ...calendar });
    sendMessage(bot, chat_id, FIND_TRIP_CONGRATS_MESSAGE_STOP, {
        parse_mode: 'HTML',
        ...calendarKeyboard(FIND_TRIP_SEARCH_TRIPS_BLOCKED),
    });
};

export const getMonthNumberByValue = value => MONTHS.findIndex(item => item === value) + 1;

export const sendCurrentDateHtml = async (id, bot, calendarKeyboard) => {
    const html = await getFindTripDateText(id);
    sendMessage(bot, id, html, { parse_mode: 'HTML', ...calendarKeyboard });
};

export const getCurrentYear = () => new Date().getFullYear();

export const getMinCalendarDateThreshold = () => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 1);
    return dateObj.getTime();
};

export const getCurrentMonthNumber = () => new Date().getMonth() + 1

export const getCurrentMonthValue = () => {
    return MONTHS[getCurrentMonthNumber() - 1];
};

export const getMonthButton = (currentCalendarMonth, currentYear) =>
    [{text: `${currentCalendarMonth} ${currentYear}`, callback_data: 'none'}];

export const getDateMilliseconds = (day, month, year) => {
    return moment(`${day}-${month}-${year}`, 'DD-MM-YYYY').valueOf();
};

export const checkIfTimeIsValid = ({ year, month, day, minDateMillisecondsThreshold }) =>
    getDateMilliseconds(day, month, year) > minDateMillisecondsThreshold;

export const getDaysButtons = (chat_id, daysForCalendar, finalChosenDay, minDateMillisecondsThreshold) =>
    daysForCalendar.reduce((result, { month: calendarMonth, day: calendarDay, year: currentYear }, index) => {
    const isTimeEnable = checkIfTimeIsValid({
        chat_id,
        day: calendarDay,
        year: currentYear,
        month: calendarMonth + 1,
        minDateMillisecondsThreshold,
    });

    const text = isTimeEnable ? `${finalChosenDay === calendarDay ? '✅' : calendarDay}` : '🚫';
    const callback_data = isTimeEnable ? createAction(FIND_TRIP_DATE_CHANGED, index) : 'none';

    if (calendarDay > 0) result.push({text , callback_data});
    return result;
}, []);

const getOsGoToPreviousMonthButtonEnabled = currentCalendarMonth => {
    return currentCalendarMonth !== new Date().getMonth() + 1;
}

export const getMonthPaginationButtons = (currentCalendarMonth, shouldDisableGoToNextMonthButton) => {
    const isGoToPreviousMonthButtonEnabled = getOsGoToPreviousMonthButtonEnabled(currentCalendarMonth);
    const goToPreviousMonthButton = {
        text: `${isGoToPreviousMonthButtonEnabled ? '⬅️' : '🤷‍♀️'}`,
        callback_data: isGoToPreviousMonthButtonEnabled ? createAction(FIND_TRIP_MONTH_DOWN) : 'None',
    };
    const goToNextMonthButton = {
        text: `${shouldDisableGoToNextMonthButton ? '🤷‍♀️' : '➡️'}`,
        callback_data: shouldDisableGoToNextMonthButton ? 'None' : createAction(FIND_TRIP_MONTH_UP),
    };

    return [
        goToPreviousMonthButton,
        {text: ' ', callback_data: 'none'},
        goToNextMonthButton,
    ]
}

export const getCalendarKeyboards = ({
                                         monthButton,
                                         chunkedDaysArrayButtons,
                                         currentMonthNumber,
                                         shouldIncludeReplyMarkup,
                                         shouldDisableGoToNextMonthButton,
                                     }) =>
    shouldIncludeReplyMarkup
        ? ({
            reply_markup: {
                inline_keyboard: [
                    monthButton,
                    WEEK_DAYS,
                    ...chunkedDaysArrayButtons,
                    getMonthPaginationButtons(currentMonthNumber, shouldDisableGoToNextMonthButton),
                ]
            }
        })
        : ({
            inline_keyboard: [
                monthButton,
                WEEK_DAYS,
                ...chunkedDaysArrayButtons,
                getMonthPaginationButtons(currentMonthNumber, shouldDisableGoToNextMonthButton),
            ]
        })
