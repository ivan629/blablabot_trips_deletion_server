import { toggleIsTripPriceCreating } from '../../services/helpers';
import { sendInitialMessage } from './tripPriceControllers';
import tripPriceListeners from './tripPriceListeners';

class PriceModule {
    setListeners (bot) {
        tripPriceListeners(bot)
    }

    async runTripPriceModule(bot, msg) {
        sendInitialMessage(bot, msg)
    }
}

export default PriceModule;
