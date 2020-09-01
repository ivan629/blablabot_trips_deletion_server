import config from 'config';
import fetch from 'node-fetch';
import { isEmpty, isNil, size } from 'lodash';
import {
    getTripCities,
    addCityToTripInDB,
    toggleIsTripCitiesCreating,
} from '../../../services/helpers';
import { creatingCitiesKeyboards, blockedCitiesKeyboard } from '../../../modules/keyboards/keyboards';
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
    CHOOSE_TRIP_CITY,
    SHOW_ACTION_TYPE,
    NOT_FOUND_CITY_MESSAGE,
    CITIES_ADD_NEW_HELP_TEXT,
    CITIES_INITIAL_HELP_TEXT,
    BLOCKED_FINAL_CITY_MESSAGE,
    CITY_ALREADY_EXISTS_ERROR_MESSAGE,
} from '../../../common/constants/commonСonstants';

export const addCityToTrip = async (bot, query) => {
    const { message: { chat: { id }} } = query;
    const [addCityAction, placeId] = parseCityAction(query.data);
    const cityDetails  = await getCityDetails(placeId);

    if (cityDetails && !cityDetails.status.ok) console.log('Error', cityDetails);

    const { formatted_address, place_id, vicinity, geometry } = cityDetails.result;
    const newCity = { formatted_address, place_id, vicinity, location: geometry.location };

    const tripCities = await getTripCities(id);
    const citiesIdsList = Object.values(tripCities).map(({ place_id }) => place_id);
    const isAlreadyAdded = citiesIdsList.includes(newCity.place_id);
    const canBeTheFinalCity = citiesIdsList.length > 0 && !isAlreadyAdded;

    if (isAlreadyAdded) {
        return sendMessage(bot, id, CITY_ALREADY_EXISTS_ERROR_MESSAGE);
    }

    if (canBeTheFinalCity) {
        sendMessage(bot, id, CITIES_ADD_NEW_HELP_TEXT, creatingCitiesKeyboards);
        await addCityToTripInDB(id, newCity);
    } else {
        sendMessage(bot, id, CITIES_ADD_NEW_HELP_TEXT);
        await addCityToTripInDB(id, newCity);
    }
};

export const startCitiesCreating = async (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, CITIES_INITIAL_HELP_TEXT, { parse_mode: 'HTML', ...blockedCitiesKeyboard });
    await toggleIsTripCitiesCreating(id, true);
};

export const sendBlockedCityMessage = (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, BLOCKED_FINAL_CITY_MESSAGE);
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
                text: CHOOSE_TRIP_CITY,
                callback_data: createCityAction(CHOOSE_TRIP_CITY, place_id),
            }],
            [{
                text: `${SHOW_NEXT_CITY} (${allCitiesSize})`,
                callback_data: createNextCityAction(SHOW_ACTION_TYPE, data.text, nextCityIndex),
            }]
        ] : [
            [{
                text: CHOOSE_TRIP_CITY,
                callback_data: createCityAction(CHOOSE_TRIP_CITY, place_id),
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
        await sendMessage(bot, data.id, NOT_FOUND_CITY_MESSAGE);
    }
};
