import { getIsFindTripCitiesCreating } from '../../../services/helpers';
import { parseCityAction, getIsBotMessage } from '../../../common/utils/utils';
import {
    handlefindTripsShowCities,
    addCityToFindTripCities,
    sendBlockedFindTripCityMessage,
} from './findCitiesUtils';
import { FIND_TRIP_SHOW_NEXT_CITIES_ACTION_TYPE } from '../../../common/messages/findTrips/findTripsKeysActions'
import {getLocalizedMessage, keysActions} from "../../../common/messages";

const findCitiesListeners = bot => {
    bot.on('message', async (msg) => {
        const shouldListen = await getIsFindTripCitiesCreating(msg.chat.id);
        if (shouldListen && !getIsBotMessage(msg.text)) {
            const data = { id: msg.chat.id, text: msg.text };
            await handlefindTripsShowCities({ bot, data, eventObject: msg });
        }

        switch (msg.text) {
            case getLocalizedMessage(keysActions.FIND_TRIP_GO_TO_CALENDAR_BLOCKED_ACTION_MESSAGES_KEY, msg): {
                sendBlockedFindTripCityMessage(bot, msg);
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
        const shouldListen = await getIsFindTripCitiesCreating(id);
        const [nextCityType, currentCity, nextCityIndex] = data.split('|');

        if (shouldListen && nextCityType === FIND_TRIP_SHOW_NEXT_CITIES_ACTION_TYPE) {
            const formattedData = { id, text: currentCity };
            await handlefindTripsShowCities({ bot, eventObject: query, data: formattedData, nextCityIndex });
            return;
        }

        if (addCityAction === getLocalizedMessage(keysActions.CHOOSE_FIND_TRIP_CITY_MESSAGES_KEY, query)) {
            await addCityToFindTripCities(bot, query);
        }
    });
};

export default findCitiesListeners;
