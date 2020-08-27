import { AVAILABLE_SEATS_MESSAGE, AVAILABLE_SEATS_MESSAGE_2 } from '../../common/constants/commonСonstants';
import {availableSeatsKeyboard, goToMenuKeyboard} from '../keyboards/keyboards';
import { sendMessage } from '../../common/utils/utils';
import availableSeatsListeners from './availableSeatsListeners';

class AvailableSeatsModule {
    runAvailableTripSeatsPicker(bot, msg) {
        const { id } = msg.chat;
        console.log('AVAILABLE_SEATS_MESSAGE');
        sendMessage(bot, id, AVAILABLE_SEATS_MESSAGE, availableSeatsKeyboard);
        sendMessage(bot, id, AVAILABLE_SEATS_MESSAGE_2, goToMenuKeyboard);
    }

    setListeners(bot) {
        availableSeatsListeners(bot);
    }
}

export default AvailableSeatsModule;
