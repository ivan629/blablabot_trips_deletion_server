import { addCityToTripInDB, toggleIsTripCitiesCreating } from '../../services/helpers';
import { creatingCitiesKeyboards } from '../keyboards/keyboards';
import { CITIES_INITIAL_HELP_TEXT } from '../../common/constants/commonСonstants';

export const addCityToTrip = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;

    bot.sendMessage(id, 'Чудово! Додайте наступне місто у подорожі');
    await addCityToTripInDB(id, data);
};

export const startCitiesCreating = async (bot, msg) => {
    const { chat: { id } } = msg;
    bot.sendMessage(id, CITIES_INITIAL_HELP_TEXT, creatingCitiesKeyboards);
    await toggleIsTripCitiesCreating(id, true);
};
