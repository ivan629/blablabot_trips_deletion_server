import { getIsTripCitiesCreating } from '../../../services/helpers';
import { parseCityAction } from '../../../common/utils/utils';
import {
    addCityToTrip,
    handleShowCities,
    sendBlockedCityMessage,
} from './citiesUtils';
import { getLocalizedMessage, keysActions } from '../../../common/messages';

const {
    PROPOSE_TRIP_KEY,
    SHOW_NEXT_CITY_ACTION,
    BLOCKED_FINAL_CITY_KEY,
    CHOOSE_TRIP_CITY_ACTION,
} = keysActions;

const citiesListeners = bot => {
    bot.on('message', async (msg) => {
        const shouldListen = await getIsTripCitiesCreating(msg.chat.id);

        if (shouldListen && msg.text !== getLocalizedMessage(PROPOSE_TRIP_KEY, msg)) {
            const formattedData = { id: msg.chat.id, text: msg.text };
            await handleShowCities(bot, formattedData, null, msg);
        }

        switch (msg.text) {
            case getLocalizedMessage(BLOCKED_FINAL_CITY_KEY, msg): {
                sendBlockedCityMessage(bot, msg);
            }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('callback_query', async query => {
        const { message: { chat: { id }}, data } = query;
        const [addCityAction] = parseCityAction(data);
        const shouldListen = await getIsTripCitiesCreating(id);
        const [nextCityType, currentCity, nextCityIndex] = data.split('|');

        if (shouldListen && nextCityType === SHOW_NEXT_CITY_ACTION) {
            const formattedData = { id, text: currentCity };
            await handleShowCities(bot, formattedData, nextCityIndex, query);
            return;
        }

        if (addCityAction === CHOOSE_TRIP_CITY_ACTION) {
            await addCityToTrip(bot, query);
        }
    });
};

export default citiesListeners;
