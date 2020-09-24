import citiesListeners from './findCitiesListeners';
import { startTripCitiesSearching } from './findCitiesUtils';
import { toggleIsFindTripProgress } from '../../../services/helpers';

class FindTripCitiesModule {
    async start(bot, msg) {
        await toggleIsFindTripProgress(msg.chat.id, true);
        await startTripCitiesSearching(bot, msg);
    }

    setListeners(bot) {
        citiesListeners(bot);
    }
}

export default FindTripCitiesModule;
