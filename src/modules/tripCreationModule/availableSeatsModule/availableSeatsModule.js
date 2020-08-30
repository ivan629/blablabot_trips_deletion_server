import { AVAILABLE_SEATS_MESSAGE } from '../../../common/constants/commonСonstants';
import availableSeatsListeners from '../../../modules/tripCreationModule/availableSeatsModule/availableSeatsListeners';
import { sendInitialData } from '../../../modules/tripCreationModule/availableSeatsModule/availableSeatsHelpers';

class AvailableSeatsModule {
    runAvailableTripSeatsPicker(bot, msg) {
        sendInitialData(bot, msg);
    }

    setListeners(bot) {
        availableSeatsListeners(bot);
    }
}

export default AvailableSeatsModule;
