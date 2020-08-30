import { sendInitialMessage } from '../../../modules/tripCreationModule/tripPriceModule/tripPriceControllers';
import tripPriceListeners from '../../../modules/tripCreationModule/tripPriceModule/tripPriceListeners';

class PriceModule {
    setListeners (bot) {
        tripPriceListeners(bot)
    }

    async runTripPriceModule(bot, msg) {
        sendInitialMessage(bot, msg)
    }
}

export default PriceModule;
