import { addCityToTripInDB, toggleIsTripCitiesCreating } from '../../services/helpers';
import { creatingCitiesKeyboards, goToMenuKeyboard } from '../keyboards/keyboards';
import { CITIES_INITIAL_HELP_TEXT, CITIES_ADD_NEW_HELP_TEXT } from '../../common/constants/commonСonstants';
import { parseData, sendMessage} from '../../common/utils/utils';

export const addCityToTrip = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;

    sendMessage(bot, id, CITIES_ADD_NEW_HELP_TEXT, creatingCitiesKeyboards);
    await addCityToTripInDB(id, parseData(data).payload);
};

export const startCitiesCreating = async (bot, msg) => {
    const { chat: { id } } = msg;
    sendMessage(bot, id, CITIES_INITIAL_HELP_TEXT, goToMenuKeyboard);
    await toggleIsTripCitiesCreating(id, true);
};
