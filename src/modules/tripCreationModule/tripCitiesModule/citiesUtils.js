import config from 'config';
import fetch from 'node-fetch';
import { isEmpty, isNil, size } from 'lodash';
import {
    getCreatingTripCities,
    addCityToTripInDB,
    toggleIsTripCitiesCreating,
} from '../../../services/helpers';
import {
    sendMessage,
    sendLocation,
    getCityDetails,
    parseCityAction,
    getIsBotMessage,
    createCityAction,
    createNextCityAction
} from '../../../common/utils/utils';
import { creatingCitiesKeyboards, blockedCitiesKeyboard } from '../../keyboards/keyboards';
import { tripCreationMessages, keysActions } from '../../../common/messages/tripCreationMessages';

const {
    SHOW_NEXT_CITY_KEY,
    CHOOSE_TRIP_CITY_KEY,
    SHOW_NEXT_CITY_ACTION,
    BLOCKED_FINAL_CITY_KEY,
    CHOOSE_TRIP_CITY_ACTION,
    NOT_FOUND_CITY_MESSAGE_KEY,
    CITIES_ADD_NEW_HELP_TEXT_KEY,
    CITIES_INITIAL_HELP_TEXT_KEY,
    CITY_ALREADY_EXISTS_ERROR_MESSAGE_KEY
} = keysActions;

export const addCityToTrip = async (bot, query) => {
    const { message: { chat: { id }} } = query;
    const [addCityAction, placeId] = parseCityAction(query.data);
    const cityDetails  = await getCityDetails(placeId);

    if (cityDetails && cityDetails.status !== 'OK' ) console.log('Error', cityDetails);

    const tripCities = await getCreatingTripCities(id);
    const order = size(tripCities) + 1;

    const { formatted_address, place_id, vicinity, name, geometry } = cityDetails.result;
    const newCity = { order, formatted_address, place_id, vicinity, name, location: geometry.location };

    const citiesIdsList = Object.values(tripCities).map(({ place_id }) => place_id);
    const isAlreadyAdded = citiesIdsList.includes(newCity.place_id);
    const canBeTheFinalCity = citiesIdsList.length > 0 && !isAlreadyAdded;

    if (isAlreadyAdded) {
        return sendMessage(bot, id, tripCreationMessages(CITY_ALREADY_EXISTS_ERROR_MESSAGE_KEY));
    }

    if (canBeTheFinalCity) {
        sendMessage(bot, id, tripCreationMessages(CITIES_ADD_NEW_HELP_TEXT_KEY), creatingCitiesKeyboards);
        await addCityToTripInDB(id, newCity);
    } else {
        sendMessage(bot, id, tripCreationMessages(CITIES_ADD_NEW_HELP_TEXT_KEY));
        await addCityToTripInDB(id, newCity);
    }
};

export const startCitiesCreating = async (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, tripCreationMessages(CITIES_INITIAL_HELP_TEXT_KEY), { parse_mode: 'HTML', ...blockedCitiesKeyboard });
    await toggleIsTripCitiesCreating(id, true);
};

export const sendBlockedCityMessage = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, tripCreationMessages(BLOCKED_FINAL_CITY_KEY));
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

const getCitiesButton = (data, place_id, nextCityIndex, allCitiesSize) => {
    const inline_keyboard = nextCityIndex ?
        [
            [{
                text: tripCreationMessages(CHOOSE_TRIP_CITY_KEY),
                callback_data: createCityAction(CHOOSE_TRIP_CITY_ACTION, place_id),
            }],
            [{
                text: `${tripCreationMessages(SHOW_NEXT_CITY_KEY)} (${allCitiesSize})`,
                callback_data: createNextCityAction(SHOW_NEXT_CITY_ACTION, data.text, nextCityIndex),
            }]
        ] : [
            [{
                text: tripCreationMessages(CHOOSE_TRIP_CITY_KEY),
                callback_data: createCityAction(CHOOSE_TRIP_CITY_ACTION, place_id),
            }]
        ];

    return { reply_markup: { inline_keyboard: inline_keyboard } }
};

export const handleShowCities = async (bot, data, customCityIndex) =>  {
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
        await sendMessage(bot, data.id, tripCreationMessages(NOT_FOUND_CITY_MESSAGE_KEY));
    }
};
