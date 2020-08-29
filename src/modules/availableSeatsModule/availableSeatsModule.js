import { AVAILABLE_SEATS_MESSAGE, AVAILABLE_SEATS_MESSAGE_2 } from '../../common/constants/commonСonstants';
import {availableSeatsKeyboard, goToMenuKeyboard} from '../keyboards/keyboards';
import { sendMessage } from '../../common/utils/utils';
import availableSeatsListeners from './availableSeatsListeners';
import { sendInitialData } from './availableSeatsHelpers';

class AvailableSeatsModule {
    runAvailableTripSeatsPicker(bot, msg) {
        console.log('AVAILABLE_SEATS_MESSAGE');
        sendInitialData(bot, msg);
    }

    setListeners(bot) {
        availableSeatsListeners(bot);
    }
}

export default AvailableSeatsModule;
