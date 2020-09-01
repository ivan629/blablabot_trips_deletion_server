import { getIsTripCitiesCreating } from '../../../services/helpers';
import { parseCityAction } from '../../../common/utils/utils';
import {
    addCityToTrip,
    handleShowCities,
    sendBlockedCityMessage,
} from '../../../modules/tripCreationModule/tripCitiesModule/citiesUtils';
import {
    CHOOSE_TRIP_CITY,
    SHOW_ACTION_TYPE,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
} from '../../../common/constants/commonСonstants';

const citiesListeners = bot => {
    bot.on('message', async (msg) => {
        const shouldListen = await getIsTripCitiesCreating(msg.chat.id);
        if (shouldListen) {
            const formattedData = { id: msg.chat.id, text: msg.text };
            await handleShowCities(bot, formattedData);
        }

        switch (msg.text) {
            case BLOCKED_FINAL_CITY_IN_THE_TRIP: {
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

        if (shouldListen && nextCityType === SHOW_ACTION_TYPE) {
            const formattedData = { id, text: currentCity };
            await handleShowCities(bot, formattedData, nextCityIndex);
            return;
        }

        if (addCityAction === CHOOSE_TRIP_CITY) {
            addCityToTrip(bot, query);
            return;
        }
    });
};

export default citiesListeners;
