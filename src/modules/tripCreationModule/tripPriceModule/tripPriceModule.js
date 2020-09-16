import tripPriceListeners from '../../../modules/tripCreationModule/tripPriceModule/tripPriceListeners';

class PriceModule {
    setListeners (bot) {
        tripPriceListeners(bot)
    }
}

export default PriceModule;
