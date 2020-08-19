import CitiesComponent from './citiesComponent';
import { getIsTripCitiesCreating } from '../../services/helpers';
import { addCityToTrip } from './citiesControllers';
import { CHOOSE_TRIP_CITY } from '../../common/constants/commonСonstants';

const citiesComponent = new CitiesComponent();

const citiesListeners = bot => {
    bot.on('message', async (msg) => {
        const shouldListen = await getIsTripCitiesCreating(msg.chat.id);

        if (shouldListen) {
            await citiesComponent.handleShowCities(msg, bot);
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
