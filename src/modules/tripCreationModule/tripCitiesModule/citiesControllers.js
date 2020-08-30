import { addCityToTripInDB, toggleIsTripCitiesCreating, getTripCities } from '../../../services/helpers';
import { creatingCitiesKeyboards, blockedCitiesKeyboard } from '../../../modules/keyboards/keyboards';
import {
    CITIES_INITIAL_HELP_TEXT,
    CITIES_ADD_NEW_HELP_TEXT,
    CITY_ALREADY_EXISTS_ERROR_MESSAGE,
    BLOCKED_FINAL_CITY_MESSAGE,
} from '../../../common/constants/commonСonstants';
import { parseData, sendMessage } from '../../../common/utils/utils';

export const addCityToTrip = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;

    const newCity = parseData(data).payload;
    const tripCities = await getTripCities(id);

    const citiesList = Object.values(tripCities).map(({ name }) => name);
    const isAlreadyAdded = citiesList.includes(newCity);
    const canBeTheFinalCity = citiesList.length > 0 && !isAlreadyAdded;

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
