import availableSeatsListeners from '../../../modules/tripCreationModule/availableSeatsModule/availableSeatsListeners';
import { sendInitialData } from './availableSeatsHelpers';

class AvailableSeatsModule {
    runAvailableTripSeatsPicker(bot, msg) {
        sendInitialData(bot, msg);
    }

    setListeners(bot) {
        availableSeatsListeners(bot);
    }
}

export default AvailableSeatsModule;
