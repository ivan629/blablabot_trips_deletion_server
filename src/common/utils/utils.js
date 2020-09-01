import shortid from 'shortid';
import {
    getIfExistDoc,
    addNewTripToDb,
    getKeyboardMessageId,
    setNewDocToCollection,
    addSessionMessagesIdsToDb,
} from '../../services/helpers';
import { initialKeyboard, calendarNotCompletedKeyboard } from '../../modules/keyboards/keyboards';
import {
    PROPOSE_TRIP,
    START_MESSAGE,
    CONFIRM_TRIP_PRICE,
    CHOOSE_CITY_MESSAGE,
    CHOOSE_ROLE_MESSAGE,
    GO_TO_THE_MAIN_MENU,
    NEXT_CITY_IN_THE_TRIP,
    NOT_FOUND_CITY_MESSAGE,
    FINAL_CITY_IN_THE_TRIP,
    TRIP_PRICE_BLOCKED_MESSAGE,
    CONFIRM_TRIP_PRICE_BLOCKED,
    GO_TO_TRIP_PRICE_SETTINGS,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
    SHARE_CARRIER_PHONE_NUMBER_MESSAGE,
} from '../../common/constants/commonСonstants';
import { getCityDetailsUrl } from '../../common/constants/urlHelpers';
import { head, isNil, last } from "lodash";

export const getTripObject = ({
                                  stop_city = null,
                                  start_city = null,
                                  trip_creation_date = null,
                                  start_date_milliseconds = null,
                                  stop_date_milliseconds = null,
                                  start_date_month = null,
                                  start_date_year = null,
                                  start_date_hour = null,
                                  start_date_minutes = null,
                                  stop_date_month = null,
                                  stop_date_year = null,
                                  stop_date_hour = null,
                                  stop_date_minutes = null,
                                  start_date_day = null,
                                  stop_date_day = null,
                                  is_creation_completed = false,
                                  is_start_date_completed = null,
                                  trip_price = null,
                                  available_seats_count = null,
                                  trip_id = null,
                              } ) => ({

    trip_id,
    start_city,
    trip_price,
    stop_city,
    trip_creation_date,
    stop_date_milliseconds,
    start_date_milliseconds,
    is_creation_completed,
    available_seats_count,
    start_date: {
        is_start_date_completed,
        start_date_month,
        start_date_year,
        start_date_hour,
        start_date_day,
        start_date_minutes,
    },
    stop_date: {
        stop_date_month,
        stop_date_year,
        stop_date_hour,
        stop_date_minutes,
        stop_date_day
    },
    cities: {}
});

const getCarrierObject = ({
                              chat_id = null,
                              carrier_name = null,
                              creation_date = null,
                              carrier_last_name = null,
                              is_trip_cities_creating = null,
                              keyboard_message_id = null,
                              session_messages_ids = {},
                              main_menu_message_id = null,
                              phone_numbers = {}
                          }) => ({
    bot: {
        is_trip_cities_creating,
        keyboard_message_id,
        session_messages_ids,
        main_menu_message_id,
    },
    carrier: {
        chat_id,
        carrier_name,
        creation_date,
        carrier_last_name,
        phone_numbers,
    },
    trips: {}
});

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const parseData = data => {
    if (isJson(data)) return JSON.parse(data);
    return { type: '', payload: '' };
};

export const addNewUserToDb = async query => {
    const {date: creation_date} = query;
    const {id: chat_id, first_name: carrier_name, last_name: carrier_last_name} = query.chat;

    const alreadyCarrierExistsInDb = await getIfExistDoc(chat_id);

    if (!alreadyCarrierExistsInDb) {
        const carrierObject = getCarrierObject({chat_id, carrier_name, carrier_last_name, creation_date});
        await setNewDocToCollection(chat_id, carrierObject);
    }
};

export const addNewTrip = async msg => {
    const { chat: { id: chat_id } } = msg;

    // console.log(msg);

    const trip_id = shortid.generate();
    const tripObject = getTripObject({ trip_id });
    await addNewTripToDb(chat_id, tripObject, trip_id)
};

export const getCityObject = (city) => city;

export const arrToObjectMap = (arr, fieldId) => arr.reduce((result, obj) => {
        result[obj[`${fieldId}`]] = obj;
        return result;
    }, {});

export const removeKeyboard = (bot, msg) => {
    const { text, chat: { id: chat_id }} = msg;
    const keyboardMessageId = getKeyboardMessageId(chat_id);

    bot.editMessageText(text, {keyboardMessageId, chat_id, reply_markup: {remove_keyboard: true}})
        .catch(() => {})
        .then(() => {})
};


export const goToTheMainMenu = async (bot, id) => sendMessage(bot, id, CHOOSE_ROLE_MESSAGE, initialKeyboard);

export const getIsBotMessage = messageText => [
    PROPOSE_TRIP,
    START_MESSAGE,
    CONFIRM_TRIP_PRICE,
    CHOOSE_CITY_MESSAGE,
    GO_TO_THE_MAIN_MENU,
    NEXT_CITY_IN_THE_TRIP,
    FINAL_CITY_IN_THE_TRIP,
    NOT_FOUND_CITY_MESSAGE,
    GO_TO_TRIP_PRICE_SETTINGS,
    TRIP_PRICE_BLOCKED_MESSAGE,
    CONFIRM_TRIP_PRICE_BLOCKED,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
    SHARE_CARRIER_PHONE_NUMBER_MESSAGE,
].includes(messageText);

export const sendMessageAndRemoveKeyboard = (bot, id, msg) =>
    sendMessage(bot, id, msg, { parse_mode: 'HTML', ...calendarNotCompletedKeyboard });

export const getFormattedData = ({ day, hour, month, minutes }) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHour = isNil(hour) ? 0 : hour < 10 ? `0${hour}` : hour;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinutes = isNil(minutes) ? 0.0 : minutes < 10 ? `0${minutes} хв` : `${minutes} хв`;

    return `${formattedDay}/${formattedMonth}, ${formattedHour}:${formattedMinutes}`;
};

export const sendMessage = async (bot, id, message, config) => await bot.sendMessage(id, message, config)
    .then(({ message_id }) => addSessionMessagesIdsToDb(id, message_id));


export const sendLocation = async (bot, id, lat, lng) => await bot.sendLocation(id, lat, lng)
    .then(({ message_id }) => addSessionMessagesIdsToDb(id, message_id));

export const getTripHtmlSummary = (trip, carrierInfo) => {
    const formattedCities = Object.values(trip.cities);

    const {
        start_date_day,
        start_date_hour,
        start_date_month,
        start_date_minutes,
    } = trip.start_date;
    const {
        stop_date_day,
        stop_date_hour,
        stop_date_month,
        stop_date_minutes,
    } = trip.stop_date;

    const startDate = getFormattedData({
        day: start_date_day,
        hour: start_date_hour,
        month: start_date_month,
        minutes: start_date_minutes,
    });

    const finishDate = getFormattedData({
        day: stop_date_day,
        hour: stop_date_hour,
        month: stop_date_month,
        minutes: stop_date_minutes,
    });

    const cities = ` 🌇 <b>Маршрут:</b> ${head(formattedCities)?.vicinity} <i>${formattedCities.slice(1, -1).map(({ vicinity }) => `- ${vicinity}`)}</i> - ${last(formattedCities)?.vicinity}`;
    const time = `     📅 <b>Час відправлення:</b> ${startDate}\n     📅 <b>Час прибуття:</b>  ${finishDate}`;
    const price = `     💰 <b>Ціна:</b> ${trip.trip_price} грн`;
    const phoneNumber = `     ☎️<b>Контактний номер</b>  ${Object.values(carrierInfo.phone_numbers).map(number => `+${number}`)} `;
    const availablePlaces = `     💺️ <b>Кількість вільних місць:</b> ${trip.available_seats_count} `;

    return `${cities}\n${time}\n${price}\n${availablePlaces}\n${phoneNumber}`;
};

export const getCityDetails = async placeId => await fetch(getCityDetailsUrl(placeId)).then(response => response.json());

// actions
export const createAction = (type, payload) => JSON.stringify(Object.assign({}, { type, payload }));
export const parseCityAction = action => action.split('|');
export const createCityAction = (type, payload) => type + '|' + payload;
export const createNextCityAction = (type, placeId, nextCityIndex) => `${type}|${placeId}|${nextCityIndex}`;
