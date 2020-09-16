import availableSeatsListeners from '../../../modules/tripCreationModule/availableSeatsModule/availableSeatsListeners';
import { sendInitialData } from './availableSeatsUtils';

class AvailableSeatsModule {
    runAvailableTripSeatsPicker(bot, msg) {
        sendInitialData(bot, msg);
    }

    setListeners(bot) {
        availableSeatsListeners(bot);
    }
}

export default AvailableSeatsModule;
