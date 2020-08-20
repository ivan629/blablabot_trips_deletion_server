import { AVAILABLE_SEATS_MESSAGE } from '../../common/constants/commonСonstants';
import { availableSeatsKeyboard } from '../keyboards/keyboards';

class AvailableSeatsModule {
    start(bot, msg) {

        const { id } = msg.chat;

        bot.sendMessage(id, AVAILABLE_SEATS_MESSAGE, availableSeatsKeyboard)
    }
}

export default AvailableSeatsModule;
