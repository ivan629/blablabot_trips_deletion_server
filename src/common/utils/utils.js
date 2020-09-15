import shortid from 'shortid';
import {
    getIfExistDoc,
    getFindTripDate,
    addNewCreatingTrip,
    addSessionMessagesIdsToDb,
    getCurrentTripCreationDate,
    setNewDocToUsersCollection,
    getIsTripCreatingInProgress,
    getIsFindTripCreatingInProgress,
} from '../../services/helpers';
import { getDefaultTripMinCalendarDateThreshold } from '../components/calendarComponent/calendarComponentUtils'
import {
    tripCreationUserChangedDate,
    getTripCreationMinCalendarDateThreshold,
} from '../../modules/tripCreationModule/tripDateModule/tripCreationCalendarUtils'
import { initialKeyboard, calendarKeyboard } from '../../modules/keyboards/keyboards';
import { handlesSaveNewFindTripDateToDbFromCalendar } from '../../modules/findTripsModule/foundTripsModule/foundTripsUtils';
import { LANGUAGES } from '../constants/botSettings'
import {
    CITIES_ADD_NEW_HELP_TEXT_MESSAGES,
    CITIES_INITIAL_HELP_TEXT_MESSAGES,
} from '../messages/tripCreationMessages/citiesMessages'
import { CONFIRM_TRIP_PRICE_MESSAGES } from '../messages/tripCreationMessages/tripPriceMessages'
import { START_ACTION } from '../messages/main/mainKeysActions'

import { getCityDetailsUrl } from '../constants/urlHelpers';
import { head, isNil, last } from 'lodash';

import { getLocalizedMessage, keysActions, messagesMap } from '../messages';

const { GO_TO_TIME_PICKER_MESSAGE_KEY } = keysActions;
const { uk, ru, en } = LANGUAGES;

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
                                  booked_seats_count = 0,
                                  booked_users_ids = {},
                              } ) => ({

    trip_id,
    start_city,
    trip_price,
    stop_city,
    trip_creation_date,
    stop_date_milliseconds,
    start_date_milliseconds,
    is_creation_completed,
    book: {
        available_seats_count,
        booked_seats_count,
        booked_users_ids,
    },
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
        language: uk,
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
    booked_trips_ids: {},
    trips: {}
});

const botMessages = Object.values(messagesMap).reduce((result, obj) => {
    result.push(...Object.values(obj))
    return result;
}, [])

export const getIsBotMessage = messageText => botMessages.includes(messageText);

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

export const goToTheMainMenu = async (bot, id, query) => sendMessage(bot, id, getLocalizedMessage(keysActions.CHOOSE_ACTION_MESSAGES_KEY, query), initialKeyboard(query));

export const getFormattedDayMonth = (month, day) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}`
};

const getFormattedHourMinutes = (hour, minutes) => {
    const formattedHour = isNil(hour) ? 0 : hour < 10 ? `0${hour}` : hour;
    const formattedMinutes = isNil(minutes) ? '00' : minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHour}:${formattedMinutes}`
};

export const getFormattedData = ({ day, month, hour, minutes }) =>
    `${getFormattedHourMinutes(hour, minutes)} ${getFormattedDayMonth(month, day)}`;

export const sendMessage = async (bot, id, message, config) => await bot.sendMessage(id, message, config)
    .then(({ message_id }) => addSessionMessagesIdsToDb(id, message_id));


export const sendLocation = async (bot, id, lat, lng) => await bot.sendLocation(id, lat, lng)
    .then(({ message_id }) => addSessionMessagesIdsToDb(id, message_id));

export const getTripHtmlSummary = ({ trip, carrierInfo, leftPadding = '', showCarrierFullInfo, eventObject }) => {
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

    const availableSeatsCount = trip.book.available_seats_count - trip.book.booked_seats_count;

    // const getFormattedCities = `${head(sortedCities)?.name} <i>${sortedCities.slice(1, -1).map(({ name }) => `- ${name}`)}</i> - ${last(sortedCities)?.vicinity}`;
    // const cities = `${leftPadding}🚏 <b>Маршрут:</b> ${getFormattedCities}`;
    // const carrierName = `${leftPadding}👤 <b>${carrierInfo.carrier_name} ${carrierInfo.carrier_last_name}</b>`;
    // const time = `${leftPadding}🕐 <b>Час відправлення:</b> ${startDate}\n${leftPadding}🕞 <b>Час прибуття:</b>  ${finishDate}`;
    // const price = `${leftPadding}💰 <b>Ціна:</b> ${trip.trip_price} грн`;
    // const phoneNumber = `${leftPadding}☎️ <b>Контактний номер</b>  ${Object.values(carrierInfo.phone_numbers).map(number => `+${number}`)} `;
    // const availablePlaces = `️${leftPadding}💺️ <b>Кількість вільних місць:</b> ${availableSeatsCount}/${trip.book.available_seats_count}`;
    //
    // return showCarrierFullInfo
    //     ? `${carrierName}\n${phoneNumber}\n${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`
    //     : `${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`;
    const formattedCities = `${head(sortedCities)?.name} <i>${sortedCities.slice(1, -1).map(({ name }) => `- ${name}`)}</i> - ${last(sortedCities)?.vicinity}`;
    const carrierName = `${leftPadding}👤 <b>${carrierInfo.carrier_name} ${carrierInfo.carrier_last_name}</b>`;
console.log(keysActions.TRIP_SUMMARY_MESSAGES_KEY);
    return getLocalizedMessage(keysActions.TRIP_SUMMARY_MESSAGES_KEY, eventObject)({
        trip,
        startDate,
        finishDate,
        leftPadding,
        carrierInfo,
        carrierName,
        formattedCities,
        showCarrierFullInfo,
        availableSeatsCount,
    })
};

export const getCityDetails = async placeId => await fetch(getCityDetailsUrl(placeId)).then(response => response.json());

// actions
export const createAction = (type, payload) => JSON.stringify(Object.assign({}, { type, payload }));
export const parseCityAction = action => action.split('|');
export const createCityAction = (type, payload) => type + '|' + payload;
export const createNextCityAction = (type, placeId, nextCityIndex) => `${type}|${placeId}|${nextCityIndex}`;

// cities
export const getSortedCities = cities => cities.sort((a, b) => (a.order > b.order) ? 1 : -1);

// calendar
export const handleUserDateChanged = async (bot, query) => {
    const chatId = query.message.chat.id;
    const isFindTripInProgress = await getIsFindTripCreatingInProgress(chatId);
    const isTripCreatingInProgress = await getIsTripCreatingInProgress(chatId);

    if (isFindTripInProgress) {
        await handlesSaveNewFindTripDateToDbFromCalendar(query);
        const message = await getCurrentTripDateText(chatId);
        sendMessage(bot, chatId, message, calendarKeyboard(getLocalizedMessage(keysActions.FIND_TRIP_SEARCH_TRIPS_MESSAGES_KEY, query), query));
    }

    if (isTripCreatingInProgress) {
        await tripCreationUserChangedDate(query);
        const message = await getCurrentTripDateText(chatId);
        sendMessage(bot, chatId, message, calendarKeyboard(getLocalizedMessage(GO_TO_TIME_PICKER_MESSAGE_KEY, query), query));
    }
};

export const handleGetDefaultTripMinCalendarDateThresholdCallback = async chat_id => {
    const isFindTripInProgress = await getIsFindTripCreatingInProgress(chat_id);
    const isTripCreatingInProgress = await getIsTripCreatingInProgress(chat_id);

    if (isFindTripInProgress) return getDefaultTripMinCalendarDateThreshold();
    if (isTripCreatingInProgress) return await getTripCreationMinCalendarDateThreshold(chat_id);

    return false;
};

export const handleGetCurrentDateForChosenDayInCalendar = async chat_id => {
    const isFindTripInProgress = await getIsFindTripCreatingInProgress(chat_id);
    const isTripCreatingInProgress = await getIsTripCreatingInProgress(chat_id);

    if (isFindTripInProgress) return getFindTripDate(chat_id);
    if (isTripCreatingInProgress) return await getCurrentTripCreationDate(chat_id);

    return false;
};

export const getCurrentTripDateText = async docName => {
    const { day, month } = await handleGetCurrentDateForChosenDayInCalendar(docName);
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `📅 ${formattedDay}/${formattedMonth}`
};
