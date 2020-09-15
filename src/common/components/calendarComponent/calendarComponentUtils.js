import { head } from 'lodash';
import moment from 'moment';
import {
    parseData,
    createAction,
    handleUserDateChanged,
    handleGetCurrentDateForChosenDayInCalendar,
    handleGetDefaultTripMinCalendarDateThresholdCallback
} from '../../utils/utils';
import { MONTHS, WEEK_DAYS } from '../../constants/calendarConstants';
import calendarComponent from './calendarComponent';
import { keysActions } from '../../messages';

export const getMonthNumberByValue = value => MONTHS.findIndex(item => item === value);

export const getCurrentYear = () => new Date().getFullYear();

export const getDefaultTripMinCalendarDateThreshold = () => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 1);
    return dateObj.getTime();
};

export const getCurrentMonthNumber = () => new Date().getMonth()

export const getCurrentMonthValue = () => {
    return MONTHS[getCurrentMonthNumber()];
};

export const getMonthButton = (currentCalendarMonth, currentYear) =>
    [{text: `${currentCalendarMonth} ${currentYear}`, callback_data: 'none'}];

export const getDateMilliseconds = (day, month, year) => {
    return moment(`${day}-${month}-${year}`, 'DD-MM-YYYY').valueOf();
};

export const checkIfTimeIsValid = ({ year, month, day, minDateMillisecondsThreshold }) => {
    // TODO: we add + one to fix a bug with isDayValid func
    return new Date().getFullYear() > year || getDateMilliseconds(day, month + 1, year) > minDateMillisecondsThreshold;
};

export const getDaysButtons = (chat_id, daysForCalendar, alreadyChosenDate, minDateMillisecondsThreshold) =>
    daysForCalendar.reduce((result, { month: calendarMonth, day: calendarDay, year: calendarYear }, index) => {
        const isTimeEnable = checkIfTimeIsValid({
            chat_id,
            day: calendarDay,
            year: calendarYear,
            month: calendarMonth,
            minDateMillisecondsThreshold,
        });

        const payload = { month: calendarMonth, day: calendarDay, year: calendarYear };
        const isAlreadyChosenDate = alreadyChosenDate.day === calendarDay
            && alreadyChosenDate.month === calendarMonth
            && alreadyChosenDate.year === calendarYear

        const text = isTimeEnable ? `${isAlreadyChosenDate ? '✅' : calendarDay}` : '🚫';
        const callback_data = isTimeEnable ? createAction(keysActions.DATE_CHANGED_ACTION, payload) : 'none';

        if (calendarDay > 0) result.push({text , callback_data});
        return result;
    }, []);

const getIsGoToPreviousMonthButtonEnabled = currentCalendarMonth => {
    return currentCalendarMonth !== new Date().getMonth();
}

export const getMonthPaginationButtons = (currentCalendarMonth, shouldDisableGoToNextMonthButton) => {
    // console.log('currentCalendarMonth', currentCalendarMonth);
    const isGoToPreviousMonthButtonEnabled = getIsGoToPreviousMonthButtonEnabled(currentCalendarMonth);
    const goToPreviousMonthButton = {
        text: `${isGoToPreviousMonthButtonEnabled ? '⬅️' : '🤷‍♀️'}`,
        callback_data: isGoToPreviousMonthButtonEnabled ? createAction(keysActions.MONTH_DOWN_ACTION) : 'None',
    };
    const goToNextMonthButton = {
        text: `${shouldDisableGoToNextMonthButton ? '🤷‍♀️' : '➡️'}`,
        callback_data: shouldDisableGoToNextMonthButton ? 'None' : createAction(keysActions.MONTH_UP_ACTION),
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


export const calendarChangeMonth = async (query, bot, isUp) => {
    const {chat, reply_markup, message_id} = query.message;
    const [oldMonth, oldYear] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    const oldMonthNumber = getMonthNumberByValue(oldMonth);
    let customMonthNumber = isUp ? oldMonthNumber + 1 : oldMonthNumber - 1;
    let customNewYear = oldYear;

    // TODO: we don't allow to choose more then 1 month in next year for now, because need to save ald year in DB
    let shouldDisableGoToNextMonthButton = false;

    if (customMonthNumber > 11) {
        customMonthNumber = 0;
        customNewYear = +oldYear + 1;
        shouldDisableGoToNextMonthButton = true;
    } else if (customMonthNumber < 0) {
        customMonthNumber = 11;

        if (+oldYear !== new Date().getFullYear()) {
            customNewYear = +oldYear - 1;
        }
    }


    const alreadyChosenDate = await handleGetCurrentDateForChosenDayInCalendar(chat.id);

    const calendar = await calendarComponent({
        customNewYear,
        chat_id: chat.id,
        customMonthNumber,
        alreadyChosenDate,
        shouldDisableGoToNextMonthButton,
        getMinCalendarDateThresholdCallback: () => handleGetDefaultTripMinCalendarDateThresholdCallback(chat.id),
    });

    await bot.editMessageReplyMarkup(calendar, { chat_id: chat.id, message_id });
};

export const calendarChangedDate = async (query, bot) => {
    const { message, data } = query;
    const { chat, reply_markup, message_id } = message;
    const { id: chat_id } = chat;

    const [monthText, dayToSave] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    const customMonthNumber = getMonthNumberByValue(monthText);
    const { payload: alreadyChosenDate } = parseData(data);

    const [monthValue, year] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    const newYear = +year;

    let shouldDisableGoToNextMonthButton = false;
    const currentYear = new Date().getFullYear();
    if (currentYear !== newYear) shouldDisableGoToNextMonthButton = true;

    const calendar = await calendarComponent({
        chat_id,
        newYear,
        customMonthNumber,
        alreadyChosenDate,
        shouldDisableGoToNextMonthButton,
        getMinCalendarDateThresholdCallback: () => handleGetDefaultTripMinCalendarDateThresholdCallback(chat_id),
    });

    await bot.editMessageReplyMarkup(calendar, {chat_id, message_id});
    await handleUserDateChanged(bot, query);
};
