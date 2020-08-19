import citiesListeners from './citiesListeners';
import { startCitiesCreating } from './citiesControllers';

class TripCitiesModule {

    async start(bot, msg) {
        await startCitiesCreating(bot, msg)
    }

    setListeners(bot) {
        citiesListeners(bot)
    }
};

export default TripCitiesModule;
