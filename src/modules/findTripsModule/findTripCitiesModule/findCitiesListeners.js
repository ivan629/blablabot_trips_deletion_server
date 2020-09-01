import { getIsFindTripCitiesCreating } from '../../../services/helpers';
import { parseCityAction, getIsBotMessage } from '../../../common/utils/utils';
import {
    handlefindTripsShowCities,
    addCityToFindTripCities,
    sendBlockedFindTripCityMessage,
} from './findCitiesUtils';
import {
    CHOOSE_FIND_TRIP_CITY,
    FIND_TRIP_GO_TO_CALENDAR_BLOCKED,
    FIND_TRIP_SHOW_NEXT_CITIES_ACTION_TYPE,
} from '../../../common/constants/commonСonstants';

const findCitiesListeners = bot => {
    bot.on('message', async (msg) => {
        const shouldListen = await getIsFindTripCitiesCreating(msg.chat.id);
        if (shouldListen && !getIsBotMessage(msg.text)) {
            const formattedData = { id: msg.chat.id, text: msg.text };
            await handlefindTripsShowCities(bot, formattedData);
        }

        switch (msg.text) {
            case FIND_TRIP_GO_TO_CALENDAR_BLOCKED: {
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
            await handlefindTripsShowCities(bot, formattedData, nextCityIndex);
            return;
        }

        if (addCityAction === CHOOSE_FIND_TRIP_CITY) {
            await addCityToFindTripCities(bot, query);
        }
    });
};

export default findCitiesListeners;
