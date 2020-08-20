import shortid from 'shortid';
import { head, isNil } from 'lodash';
import { getMonthNumberByValue, sendCurrentDateHtml } from './tripDateUtils';
import CalendarComponent from './calendarComponent';
import timeComponent from './timeComponent';
import { calendarKeyboard } from '../keyboards/keyboards';
import { parseData } from '../../common/utils/utils';
import { getTripObject } from '../../common/utils/utils';
import {
    TIME_CHOOSING_MESSAGE,
    CONFIRM_TRIP_DATE,
    GO_TO_TIME_PICKER,
    GO_TO_TRIP_END_TIME_PICKER,
    TRIP_END_TIME_PICKER_MESSAGE,
    GO_TO_AVAILABLE_SEATS_SETTING,
} from '../../common/constants/commonСonstants';
import {
    updateFieldDb,
    getNotCompletedTrip,
    toggleIsTripStartDateCompleted,
    getIsStartDateCreatingCompleted,
} from '../../services/helpers';

const calendarComponent = new CalendarComponent();

const confirmTimeKeyboard = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: 'data',
                    callback_data: 'edit_trip_date'
                },
                {
                    text: CONFIRM_TRIP_DATE,
                },
            ]
        ]
    }
};


export const showTripEndCalendarComponent = async (msg, bot) => {
    const { chat: { id } } = msg;
    await toggleIsTripStartDateCompleted(id);
    bot.sendMessage(id, TRIP_END_TIME_PICKER_MESSAGE, timeComponent())
};

export const showTimeComponent = (msg, bot) => {
    const { chat: { id } } = msg;
    bot.sendMessage(id, TIME_CHOOSING_MESSAGE, timeComponent())
};

const setDatePickerDataToDb = async (chat_id, field, data) => {
    const notCompletedTrip = await getNotCompletedTrip(chat_id);
    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);

    if (isNil(notCompletedTrip)) return;

    const tripDateType = isStartDateCreatingCompleted ? 'stop_date' : 'start_date';
    const readyField = isStartDateCreatingCompleted ? `stop_date_${field}` : `start_date_${field}`;
    await updateFieldDb(chat_id, `trips.${notCompletedTrip.trip_id}.${tripDateType}.${readyField}`, data);
};

export const changeCalendarMonth = (query, bot, isUp) => {
    const {chat, reply_markup, message_id} = query.message;
    const [oldMonth, oldYear] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    let newYear;
    const oldMonthNumber = getMonthNumberByValue(oldMonth);
    let newMonthNumber = isUp ? oldMonthNumber + 1 : oldMonthNumber - 1;

    if (newMonthNumber > 12) {
        newMonthNumber = 1;
        newYear = +oldYear + 1;
    } else if (newMonthNumber < 1) {
        newMonthNumber = 12;
        newYear = +oldYear - 1;
    }

    bot.editMessageReplyMarkup(calendarComponent.getCalendar(newMonthNumber, newYear), {
        chat_id: chat.id,
        message_id
    });
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

    await sendCurrentDateHtml(chat_id, bot, calendarKeyboard(GO_TO_TIME_PICKER));
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

export const confirmTripDate = async (query, bot) => {
    // const { chat: { id } } = query;
    // bot.sendMessage(id, 'Напишіть місто виїзду, наприклад Київ');
    // await toggleIsTripCitiesCreating(id, 'bot.is_trip_cities_creating', true);
};
