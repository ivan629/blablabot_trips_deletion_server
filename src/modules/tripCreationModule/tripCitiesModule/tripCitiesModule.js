import { startCitiesCreating } from './citiesUtils';
import citiesListeners from '../../../modules/tripCreationModule/tripCitiesModule/citiesListeners';

class TripCitiesModule {
    async start(bot, msg) {
        await startCitiesCreating(bot, msg);
    }

    setListeners(bot) {
        citiesListeners(bot);
    }
}

export default TripCitiesModule;
