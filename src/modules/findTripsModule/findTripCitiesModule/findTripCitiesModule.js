import citiesListeners from './findCitiesListeners';
import { startTripCitiesSearching } from './findCitiesUtils';

class FindTripCitiesModule {
    async start(bot, msg) {
        await startTripCitiesSearching(bot, msg)
    }

    setListeners(bot) {
        citiesListeners(bot)
    }
}

export default FindTripCitiesModule;
