import shortid from 'shortid';
import {
    getIfExistDoc,
    addNewCreatingTrip,
    setNewDocToUsersCollection,
    addSessionMessagesIdsToDb,
} from '../../services/helpers';
import { initialKeyboard } from '../../modules/keyboards/keyboards';
import {
    FIND_TRIP,
    PROPOSE_TRIP,
    START_MESSAGE,
    CONFIRM_TRIP_PRICE,
    CHOOSE_CITY_MESSAGE,
    CHOOSE_ROLE_MESSAGE,
    GO_TO_THE_MAIN_MENU,
    NEXT_CITY_IN_THE_TRIP,
    NOT_FOUND_CITY_MESSAGE,
    FINAL_CITY_IN_THE_TRIP,
    CITIES_INITIAL_HELP_TEXT,
    TRIP_PRICE_BLOCKED_MESSAGE,
    CONFIRM_TRIP_PRICE_BLOCKED,
    GO_TO_TRIP_PRICE_SETTINGS,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
    FIND_TRIP_GO_TO_CALENDAR_BLOCKED,
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
                              is_trip_cities_creating = false,
                              is_find_trip_city_creating = false,
                              keyboard_message_id = null,
                              session_messages_ids = {},
                              main_menu_message_id = null,
                              phone_numbers = {}
                          }) => ({
    bot: {
        is_trip_cities_creating,
        is_find_trip_city_creating,
        keyboard_message_id,
        session_messages_ids,
        main_menu_message_id,
    },
    find_trip: {
        date: {
            day: null,
            month: null,
            year: null,
        },
        cities: {},
    },
    create_trip: {},
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
        await setNewDocToUsersCollection(chat_id, carrierObject);
    }
};

export const addNewTrip = async msg => {
    const { chat: { id: chat_id } } = msg;

    const trip_id = shortid.generate();
    const tripObject = getTripObject({ trip_id });
    await addNewCreatingTrip(chat_id, tripObject, trip_id)
};

export const getCityObject = (city) => city;

export const goToTheMainMenu = async (bot, id) => sendMessage(bot, id, CHOOSE_ROLE_MESSAGE, initialKeyboard);

export const getIsBotMessage = messageText => [
    FIND_TRIP,
    PROPOSE_TRIP,
    START_MESSAGE,
    CONFIRM_TRIP_PRICE,
    CHOOSE_CITY_MESSAGE,
    GO_TO_THE_MAIN_MENU,
    NEXT_CITY_IN_THE_TRIP,
    FINAL_CITY_IN_THE_TRIP,
    CITIES_INITIAL_HELP_TEXT,
    NOT_FOUND_CITY_MESSAGE,
    GO_TO_TRIP_PRICE_SETTINGS,
    TRIP_PRICE_BLOCKED_MESSAGE,
    CONFIRM_TRIP_PRICE_BLOCKED,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
    FIND_TRIP_GO_TO_CALENDAR_BLOCKED,
    SHARE_CARRIER_PHONE_NUMBER_MESSAGE,
].includes(messageText);

export const getFormattedDayMonth = (month, day) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}`
};

const getFormattedHourMinutes = (hour, minutes) => {
    const formattedHour = isNil(hour) ? 0 : hour < 10 ? `0${hour}` : hour;
    const formattedMinutes = isNil(minutes) ? '00' : minutes < 10 ? `0${minutes} хв` : `0${minutes} хв`;
    return `${formattedHour}/${formattedMinutes}`
};

export const getFormattedData = ({ day, month, hour, minutes }) =>
    `${getFormattedHourMinutes(hour, minutes)} ${getFormattedDayMonth(month, day)}`;

export const sendMessage = async (bot, id, message, config) => await bot.sendMessage(id, message, config)
    .then(({ message_id }) => addSessionMessagesIdsToDb(id, message_id));


export const sendLocation = async (bot, id, lat, lng) => await bot.sendLocation(id, lat, lng)
    .then(({ message_id }) => addSessionMessagesIdsToDb(id, message_id));

export const getTripHtmlSummary = ({ trip, carrierInfo, leftPadding = '', showCarrierFullInfo} ) => {
    const sortedCities = getSortedCities(Object.values(trip.cities));

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

    const getFormattedCities = `${head(sortedCities)?.name} <i>${sortedCities.slice(1, -1).map(({ name }) => `- ${name}`)}</i> - ${last(sortedCities)?.vicinity}`;
    const cities = `${leftPadding}🚏 <b>Маршрут:</b> ${getFormattedCities}`;
    const carrierName = `${leftPadding}👤 <b>${carrierInfo.carrier_name} ${carrierInfo.carrier_last_name}</b>`;
    const time = `${leftPadding}🕐 <b>Час відправлення:</b> ${startDate}\n${leftPadding}🕞 <b>Час прибуття:</b>  ${finishDate}`;
    const price = `${leftPadding}💰 <b>Ціна:</b> ${trip.trip_price} грн`;
    const phoneNumber = `${leftPadding}☎️ <b>Контактний номер</b>  ${Object.values(carrierInfo.phone_numbers).map(number => `+${number}`)} `;
    const availablePlaces = `️${leftPadding}💺️ <b>Кількість вільних місць:</b> ${trip.available_seats_count} `;

    return showCarrierFullInfo
        ? `${carrierName}\n${phoneNumber}\n${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`
        : `${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`;
};

export const getCityDetails = async placeId => await fetch(getCityDetailsUrl(placeId)).then(response => response.json());

// actions
export const createAction = (type, payload) => JSON.stringify(Object.assign({}, { type, payload }));
export const parseCityAction = action => action.split('|');
export const createCityAction = (type, payload) => type + '|' + payload;
export const createNextCityAction = (type, placeId, nextCityIndex) => `${type}|${placeId}|${nextCityIndex}`;

// cities
export const getSortedCities = cities => cities.sort((a, b) => (a.order > b.order) ? 1 : -1);
