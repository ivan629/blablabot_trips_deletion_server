import { sendInitialData } from './availableSeatsUtils';
import availableSeatsListeners from '../../../modules/tripCreationModule/availableSeatsModule/availableSeatsListeners';

class AvailableSeatsModule {
    runAvailableTripSeatsPicker(bot, msg) {
        sendInitialData(bot, msg);
    }

    setListeners(bot) {
        availableSeatsListeners(bot);
    }
}

export default AvailableSeatsModule;
