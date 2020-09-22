import { sendMessage } from '../../../common/utils/utils';
import findTripDateListeners from './findTripDateListeners';
import { goToMenuKeyboard, findTripsDaysAndCalendarKeyboard } from '../../keyboards/keyboards';
import { getLocalizedMessage, keysActions } from '../../../common/messages';

class findTripDateModule {
    async runStartTripDatePicker(bot, msg) {
        await sendMessage(
            bot,
            msg.chat.id,
            getLocalizedMessage(keysActions.FIND_TRIP_QUICK_DATE_PICKER_MESSAGES_KEY, msg),
            goToMenuKeyboard(msg));

        await sendMessage(
            bot,
            msg.chat.id,
            getLocalizedMessage(keysActions.CALENDAR_CONGRATS_START_MESSAGES_KEY, msg),
            { parse_mode: 'HTML', ...findTripsDaysAndCalendarKeyboard(msg) });
    }

    setListeners(bot) {
        findTripDateListeners(bot)
    }
}

export default findTripDateModule;
