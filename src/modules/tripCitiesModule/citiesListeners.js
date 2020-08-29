import CitiesComponent from './citiesComponent';
import { getIsTripCitiesCreating } from '../../services/helpers';
import { addCityToTrip, sendBlockedCityMessage } from './citiesControllers';
import {
    CHOOSE_TRIP_CITY,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
} from '../../common/constants/commonСonstants';

const citiesComponent = new CitiesComponent();

const citiesListeners = bot => {
    bot.on('message', async (msg) => {
        const shouldListen = await getIsTripCitiesCreating(msg.chat.id);
        if (shouldListen) {
            await citiesComponent.handleShowCities(bot, msg);
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

    bot.on('callback_query', query => {
        const data = JSON.parse(query.data);

        switch (data.type) {
            case CHOOSE_TRIP_CITY: {
                addCityToTrip(bot, query);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default citiesListeners;
