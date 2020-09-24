import {
    addCityToTrip,
    handleShowCities,
    sendBlockedCityMessage,
} from './citiesUtils';
import { keysActions } from '../../../common/messages';
import { parseCityAction } from '../../../common/utils/utils';
import { getIsTripCitiesCreating } from '../../../services/helpers';
import { listenerCase } from '../../../common/utils/listenersUtils';

const {
    PROPOSE_TRIP_KEY,
    SHOW_NEXT_CITY_ACTION,
    BLOCKED_FINAL_CITY_KEY,
    CHOOSE_TRIP_CITY_ACTION,
} = keysActions;

const citiesListeners = (bot) => {
    bot.on('message', async (msg) => {
        const shouldListen = await getIsTripCitiesCreating(msg.chat.id);

        if (shouldListen && !listenerCase(PROPOSE_TRIP_KEY, msg.text)) {
            const formattedData = { id: msg.chat.id, text: msg.text };
            return handleShowCities(bot, formattedData, null, msg);
        }

        if (listenerCase(BLOCKED_FINAL_CITY_KEY, msg.text)) {
            return sendBlockedCityMessage(bot, msg);
        }
    });

    bot.on('callback_query', async (query) => {
        const {
            message: {
                chat: { id },
            },
            data,
        } = query;
        const [addCityAction] = parseCityAction(data);
        const shouldListen = await getIsTripCitiesCreating(id);
        const [nextCityType, currentCity, nextCityIndex] = data.split('|');

        if (shouldListen && nextCityType === SHOW_NEXT_CITY_ACTION) {
            const formattedData = { id, text: currentCity };
            return handleShowCities(bot, formattedData, nextCityIndex, query);
        }

        if (addCityAction === CHOOSE_TRIP_CITY_ACTION) {
            return addCityToTrip(bot, query);
        }
    });
};

export default citiesListeners;
