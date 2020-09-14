import { head, isNil } from 'lodash';
import { calendarKeyboard } from '../../keyboards/keyboards';
import { parseData, sendMessage } from '../../../common/utils/utils';
import { MONTHS } from '../../../common/constants/calendarConstants';
import timeComponent from '../../../modules/tripCreationModule/tripDateModule/timeComponent';
import { getLocalizedMessage, keysActions } from '../../../common/messages';
import { blockedTimePickerKeyboard, blockedTimeStopPickerKeyboard } from '../../keyboards/keyboards';
import { getDefaultTripMinCalendarDateThreshold, getDateMilliseconds } from '../../../common/components/calendarComponent/calendarComponentUtils';
import {
    updateFieldInUserDoc,
    getCreatingTrip,
    toggleIsTripStartDateCompleted,
    getIsStartDateCreatingCompleted,
    getCurrentTripDateText,
} from '../../../services/helpers';

const {
    TIME_CHOOSING_MESSAGE_KEY,
    TIME_CHOOSING_HELP_MESSAGE_KEY,
    TIME_STOP_CHOOSING_HELP_MESSAGE_KEY,
    BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY,
    GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY,
    GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES_KEY,
    BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGE_KEY,
} = keysActions;

export const getMonthNumberByValue = value => MONTHS.findIndex(item => item === value);

export const sendCurrentDateHtml = async (id, bot, calendarKeyboard, isOnlyDate) => {
    const html = await getCurrentTripDateText(id, isOnlyDate);
    sendMessage(bot, id, html, { parse_mode: 'HTML', ...calendarKeyboard });
};

export const getTripCreationMinCalendarDateThreshold = async chat_id => {
    let minDateMillisecondsThreshold = getDefaultTripMinCalendarDateThreshold();
    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);


    if (isStartDateCreatingCompleted) {
        const { start_date: { start_date_hour, start_date_day, start_date_year, start_date_month } } = await getCreatingTrip(chat_id);
        // we allow to set the same trip end day, with min hours threshold
        const minDay = start_date_hour < 24 ? start_date_day - 1 : start_date_day;

        // TODO: we add + one to fix a bug with isDayValid func
        const minMonth = start_date_month + 1;
        minDateMillisecondsThreshold = getDateMilliseconds(minDay, minMonth , +start_date_year);
    }

    return minDateMillisecondsThreshold;
};


export const showTripEndCalendarComponent = async (msg, bot) => {
    const { chat: { id } } = msg;
    await toggleIsTripStartDateCompleted(id);
};

export const showTimeComponent = async (bot, msg) => {
    const { chat: { id } } = msg;
    const timePicker = await timeComponent(id);
    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(id);

    const helpMessage = isStartDateCreatingCompleted
        ? getLocalizedMessage(TIME_STOP_CHOOSING_HELP_MESSAGE_KEY, msg)
        : getLocalizedMessage(TIME_CHOOSING_HELP_MESSAGE_KEY, msg)
    const keyboard = isStartDateCreatingCompleted
        ? blockedTimeStopPickerKeyboard(msg)
        : blockedTimePickerKeyboard(msg);

    sendMessage(bot, id, getLocalizedMessage(TIME_CHOOSING_MESSAGE_KEY, msg), timePicker);
    sendMessage(bot, id, helpMessage, { parse_mode: 'HTML', ...keyboard });
};

const setDatePickerDataToDb = async (chat_id, field, data) => {
    const notCompletedTrip = await getCreatingTrip(chat_id);
    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);

    if (isNil(notCompletedTrip)) return;

    const tripDateType = isStartDateCreatingCompleted ? 'stop_date' : 'start_date';
    const readyField = isStartDateCreatingCompleted ? `stop_date_${field}` : `start_date_${field}`;
    await updateFieldInUserDoc(chat_id, `create_trip.${tripDateType}.${readyField}`, data);
};

export const changeCalendarMonth = async (query, bot, isUp) => {
    const {chat, reply_markup, message_id} = query.message;
    const [oldMonth, oldYear] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    let newYear;
    const oldMonthNumber = getMonthNumberByValue(oldMonth);
    let customMonthNumber = isUp ? oldMonthNumber + 1 : oldMonthNumber - 1;

    // TODO: we don't allow to choose more then 1 month in next year for now, because need to save ald year in DB
    let shouldDisableGoToNextMonthButton = false;

    if (customMonthNumber > 12) {
        customMonthNumber = 1;
        newYear = +oldYear + 1;
        shouldDisableGoToNextMonthButton = true;
    } else if (customMonthNumber < 1) {
        customMonthNumber = 12;
        newYear = +oldYear - 1;
    }

    const calendar = await calendarComponent.getCalendar({ customMonthNumber, newYear, shouldDisableGoToNextMonthButton, chat_id: chat.id });

    bot.editMessageReplyMarkup(calendar, {chat_id: chat.id, message_id});
};

export const tripCreationUserChangedDate = async query => {
    const { message, data } = query;
    const { id: chat_id } = message.chat;
    const { payload: { day, month, year} } = parseData(data);

    const alReqs = [
        await setDatePickerDataToDb(chat_id, 'day', day),
        await setDatePickerDataToDb(chat_id, 'month', month),
        await setDatePickerDataToDb(chat_id, 'year', year),
    ];

    await Promise.all(alReqs);
};

export const setTripHour = async (query, bot) => {
    const { message: { chat: { id: chat_id }}, data } = query;

    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);
    const keyboardType = isStartDateCreatingCompleted
        ? getLocalizedMessage(GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES_KEY, query)
        : getLocalizedMessage(GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY, query);

    await setDatePickerDataToDb(chat_id, 'hour', parseData(data).payload);
    await sendCurrentDateHtml(chat_id, bot, calendarKeyboard(keyboardType, query));
};

export const setTripMinutes = async (query, bot) => {
    const { message: { chat: { id: chat_id }}, data } = query;

    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);
    const keyboardType = isStartDateCreatingCompleted
        ? getLocalizedMessage(GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES_KEY, query)
        : getLocalizedMessage(GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY, query);

    await setDatePickerDataToDb(chat_id, 'minutes', parseData(data).payload);
    await sendCurrentDateHtml(chat_id, bot, calendarKeyboard(keyboardType, query));
};

export const showBlockedGoToTimePickerMessage = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, getLocalizedMessage(BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY, msg))
};

export const showBlockedGoToTripEnd = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, getLocalizedMessage(BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY, msg))
};

export const sendBlockedGoToAvailableMessage = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, getLocalizedMessage(BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGE_KEY, msg));
};
