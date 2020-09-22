import { getIsFindTripCitiesCreating } from '../../../services/helpers';
import { parseCityAction, getIsBotMessage } from '../../../common/utils/utils';
import { listenerCase } from '../../../common/utils/listenersUtils';
import {
    handlefindTripsShowCities,
    addCityToFindTripCities,
    sendBlockedFindTripCityMessage,
} from './findCitiesUtils';
import { keysActions } from '../../../common/messages';
import { FIND_TRIP_SHOW_NEXT_CITIES_ACTION_TYPE } from '../../../common/messages/findTrips/findTripsKeysActions'

const findCitiesListeners = bot => {
    bot.on('message', async (msg) => {
        const shouldListen = await getIsFindTripCitiesCreating(msg.chat.id);
        if (shouldListen && !getIsBotMessage(msg.text)) {
            const data = { id: msg.chat.id, text: msg.text };
            return handlefindTripsShowCities({ bot, data, eventObject: msg });
        }

        if (listenerCase(keysActions.FIND_TRIP_GO_TO_CALENDAR_BLOCKED_ACTION_MESSAGES_KEY, msg.text)) {
            return sendBlockedFindTripCityMessage(bot, msg);
        }
    });

    bot.on('callback_query', async query => {
        const { message: { chat: { id }}, data } = query;
        const [addCityAction] = parseCityAction(data);
        const shouldListen = await getIsFindTripCitiesCreating(id);
        const [nextCityType, currentCity, nextCityIndex] = data.split('|');

        if (shouldListen && nextCityType === FIND_TRIP_SHOW_NEXT_CITIES_ACTION_TYPE) {
            const formattedData = { id, text: currentCity };
            await handlefindTripsShowCities({ bot, eventObject: query, data: formattedData, nextCityIndex });
            return;
        }

        if (listenerCase(keysActions.CHOOSE_FIND_TRIP_CITY_MESSAGES_KEY, addCityAction)) {
            await addCityToFindTripCities(bot, query);
        }
    });
};

export default findCitiesListeners;
