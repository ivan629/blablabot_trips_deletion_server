import citiesListeners from '../../../modules/tripCreationModule/tripCitiesModule/citiesListeners';
import { startCitiesCreating } from '../../../modules/tripCreationModule/tripCitiesModule/citiesControllers';

class TripCitiesModule {

    async start(bot, msg) {
        await startCitiesCreating(bot, msg)
    }

    setListeners(bot) {
        citiesListeners(bot)
    }
}

export default TripCitiesModule;
