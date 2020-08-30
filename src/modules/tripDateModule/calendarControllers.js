import shortid from 'shortid';
import { head, isNil } from 'lodash';
import { getMonthNumberByValue, sendCurrentDateHtml } from './tripDateUtils';
import CalendarComponent from './calendarComponent';
import timeComponent from './timeComponent';
import { calendarKeyboard } from '../keyboards/keyboards';
import { parseData, sendMessage } from '../../common/utils/utils';
import { getTripObject } from '../../common/utils/utils';
import { blockedTimePickerKeyboard, blockedTimeStopPickerKeyboard } from '../keyboards/keyboards';
import {
    GO_TO_TIME_PICKER,
    TIME_CHOOSING_MESSAGE,
    GO_TO_TRIP_END_TIME_PICKER,
    TIME_CHOOSING_HELP_MESSAGE,
    GO_TO_AVAILABLE_SEATS_SETTING,
    TIME_STOP_CHOOSING_HELP_MESSAGE,
    BLOCKED_GO_TO_TIME_PICKER_MESSAGE,
    BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE,
    BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGE,
} from '../../common/constants/commonСonstants';
import {
    updateFieldDb,
    getNotCompletedTrip,
    toggleIsTripStartDateCompleted,
    getIsStartDateCreatingCompleted,
} from '../../services/helpers';

const calendarComponent = new CalendarComponent();

export const showTripEndCalendarComponent = async (msg, bot) => {
    const { chat: { id } } = msg;
    await toggleIsTripStartDateCompleted(id);
};

export const showTimeComponent = async (bot, msg) => {
    const { chat: { id } } = msg;
    const timePicker = await timeComponent(id);
    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(id);
    const helpMessage = isStartDateCreatingCompleted ? TIME_STOP_CHOOSING_HELP_MESSAGE : TIME_CHOOSING_HELP_MESSAGE;
    const keyboard = isStartDateCreatingCompleted ? blockedTimeStopPickerKeyboard : blockedTimePickerKeyboard;

    sendMessage(bot, id, TIME_CHOOSING_MESSAGE, timePicker);
    sendMessage(bot, id, helpMessage, { parse_mode: 'HTML', ...keyboard });
};

const setDatePickerDataToDb = async (chat_id, field, data) => {
    const notCompletedTrip = await getNotCompletedTrip(chat_id);
    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);

    if (isNil(notCompletedTrip)) return;

    const tripDateType = isStartDateCreatingCompleted ? 'stop_date' : 'start_date';
    const readyField = isStartDateCreatingCompleted ? `stop_date_${field}` : `start_date_${field}`;
    await updateFieldDb(chat_id, `trips.${notCompletedTrip.trip_id}.${tripDateType}.${readyField}`, data);
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

    bot.editMessageReplyMarkup(calendar, {chat_id: chat.id, message_id},);
};

export const userChangedDate = async (query, bot) => {
    const { message, data } = query;
    const { chat, reply_markup, trip_creation_date } = message;

    const { id: chat_id } = chat;
    const [monthText, start_date_year] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    const start_date_month = getMonthNumberByValue(monthText);
    const { payload: start_date_day } = parseData(data);

    const notCompletedTrip = await getNotCompletedTrip(chat_id);

    if (isNil(notCompletedTrip)) {
        const trip_id = shortid.generate();
        const tripData = getTripObject({
            start_date_day,
            start_date_month,
            start_date_year,
            trip_creation_date,
            trip_id,
        });

        await updateFieldDb(chat_id, `trips.${trip_id}`, tripData);
    } else {
        await setDatePickerDataToDb(chat_id, 'day', start_date_day);
        await setDatePickerDataToDb(chat_id, 'month', start_date_month);
        await setDatePickerDataToDb(chat_id, 'year', start_date_year);
    }

    await sendCurrentDateHtml(chat_id, bot, calendarKeyboard(GO_TO_TIME_PICKER), true);
};

export const setTripHour = async (query, bot) => {
    const { message: { chat: { id: chat_id }}, data } = query;

    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);
    const keyboardType = isStartDateCreatingCompleted ? GO_TO_AVAILABLE_SEATS_SETTING : GO_TO_TRIP_END_TIME_PICKER;

    await setDatePickerDataToDb(chat_id, 'hour', parseData(data).payload);
    await sendCurrentDateHtml(chat_id, bot, calendarKeyboard(keyboardType));
};

export const setTripMinutes = async (query, bot) => {
    const { message: { chat: { id: chat_id }}, data } = query;

    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);
    const keyboardType = isStartDateCreatingCompleted ? GO_TO_AVAILABLE_SEATS_SETTING : GO_TO_TRIP_END_TIME_PICKER;

    await setDatePickerDataToDb(chat_id, 'minutes', parseData(data).payload);
    await sendCurrentDateHtml(chat_id, bot, calendarKeyboard(keyboardType));
};

export const confirmTripDate = async (bot, query) => {};

export const showBlockedGoToTimePickerMessage = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, BLOCKED_GO_TO_TIME_PICKER_MESSAGE)
};

export const showBlockedGoToTripEnd = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE)
};

export const sendBlockedGoToAvailableMessage = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGE);
};
