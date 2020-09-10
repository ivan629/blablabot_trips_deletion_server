import config from 'config';
import fetch from 'node-fetch';
import { isEmpty, isNil, size } from 'lodash';
import {
    toggleIsFindTripCitiesCreating,
} from '../../../services/helpers';
import { getFindTripCities, addCityToFindTripInDB } from '../../../modules/findTripsModule/findTripsUtils';
import { findTripGoToCalendarKeyboard, blockedFindTripCitiesKeyboard } from '../../../modules/keyboards/keyboards';
import {
    sendMessage,
    sendLocation,
    getCityDetails,
    parseCityAction,
    getIsBotMessage,
    createCityAction,
    createNextCityAction
} from '../../../common/utils/utils';
import {
    SHOW_NEXT_CITY,
    CHOOSE_FIND_TRIP_CITY,
    SHOW_NEXT_CITY_ACTION,
    FIND_TRIP_MAX_CITIES_CONT_MESSAGE,
    NOT_FOUND_CITY_MESSAGE,
    FIND_TRIP_CITIES_ADD_NEW_HELP_TEXT,
    CITIES_INITIAL_HELP_TEXT,
    FIND_TRIP_GO_TO_CALENDAR_BLOCKED_MESSAGE,
    CITY_ALREADY_EXISTS_ERROR_MESSAGE,
} from '../../../common/constants/commonСonstants';

export const sendBlockedFindTripCityMessage = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, FIND_TRIP_GO_TO_CALENDAR_BLOCKED_MESSAGE);
};

const getCitiesButton = (data, place_id, nextCityIndex, allCitiesSize) => {
    const inline_keyboard = nextCityIndex ?
        [
            [{
                text: CHOOSE_FIND_TRIP_CITY,
                callback_data: createCityAction(CHOOSE_FIND_TRIP_CITY, place_id),
            }],
            [{
                text: `${SHOW_NEXT_CITY} (${allCitiesSize})`,
                callback_data: createNextCityAction(SHOW_NEXT_CITY_ACTION, data.text, nextCityIndex),
            }]
        ] : [
            [{
                text: CHOOSE_FIND_TRIP_CITY,
                callback_data: createCityAction(CHOOSE_FIND_TRIP_CITY, place_id),
            }]
        ];

    return { reply_markup: { inline_keyboard: inline_keyboard } }
};

export const startTripCitiesSearching = async (bot, msg) => {
    const { chat: { id } } = msg;
    await sendMessage(bot, id, CITIES_INITIAL_HELP_TEXT, { parse_mode: 'HTML', ...blockedFindTripCitiesKeyboard });
    await toggleIsFindTripCitiesCreating(id, true);
};

export const addCityToFindTripCities = async (bot, query) => {
    const { message: { chat: { id }} } = query;
    const [addCityAction, placeId] = parseCityAction(query.data);
    const cityDetails  = await getCityDetails(placeId);

    if (cityDetails && cityDetails.status !== 'OK') console.log('Error', cityDetails);

    const findTripCities = await getFindTripCities(id);
    const order = size(findTripCities) + 1;
    const { formatted_address, place_id, vicinity, name, geometry } = cityDetails.result;
    const newCity = { order, formatted_address, place_id, vicinity, name, location: geometry.location };

    const findTripCitiesIdsList = Object.values(findTripCities).map(({ place_id }) => place_id);
    const isAlreadyAdded = findTripCitiesIdsList.includes(newCity.place_id);
    const canBeTheFinalCity = findTripCitiesIdsList.length > 0 && !isAlreadyAdded;

    const isMoreThenMAxCitiesNumber = findTripCitiesIdsList.length > 1;

    if (isMoreThenMAxCitiesNumber) {
        return sendMessage(bot, id, FIND_TRIP_MAX_CITIES_CONT_MESSAGE);
    }

    if (isAlreadyAdded) {
        return sendMessage(bot, id, CITY_ALREADY_EXISTS_ERROR_MESSAGE);
    }

    if (canBeTheFinalCity) {
        await toggleIsFindTripCitiesCreating(id, false);
        sendMessage(bot, id, FIND_TRIP_CITIES_ADD_NEW_HELP_TEXT, findTripGoToCalendarKeyboard);
        await addCityToFindTripInDB(id, newCity);
    } else {
        sendMessage(bot, id, FIND_TRIP_CITIES_ADD_NEW_HELP_TEXT);
        await addCityToFindTripInDB(id, newCity);
    }
};

export const fetchCitiesAutocomplete = async city =>  {
    const mapKey = config.firebaseConfig.apiKey;
    let result;

    try {
        const api = encodeURI(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=formatted_address,name,geometry,place_id&key=${mapKey}`);
        const response = await fetch(api);
        result = await response.json();
    } catch (error) {
        console.log(error);
    }

    return result;
};

export const handlefindTripsShowCities = async (bot, data, customCityIndex) =>  {
    if (getIsBotMessage(data.text)) return;

    // check if this chat id has creating trp in progress
    const response = await fetchCitiesAutocomplete(data.text);
    const isCityFounded = !isNil(response) && !isEmpty(response.candidates);

    if (isCityFounded) {
        if (isNil(customCityIndex)) customCityIndex = 0;

        const { name, formatted_address, place_id, geometry: {location: {lat, lng}} } = response.candidates[customCityIndex];
        let nextCityIndex = +customCityIndex + 1;
        const cityIndex = nextCityIndex;
        const citiesSize = size(response.candidates);

        if (nextCityIndex === size(response.candidates)) nextCityIndex = null;
        const leftCities = citiesSize - nextCityIndex;

        sendLocation(bot, data.id, lat, lng).then(() => {
            const cityName = `${cityIndex}. <b>${name}</b>\n    <em>${formatted_address}</em>`;
            sendMessage(bot, data.id, cityName, {parse_mode: 'HTML', ...getCitiesButton(data, place_id, nextCityIndex, leftCities)})
        });
    } else {
        await sendMessage(bot, data.id, NOT_FOUND_CITY_MESSAGE);
    }
};
