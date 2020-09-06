import {
    CALENDAR_CONGRATS_MESSAGE_START,
    FIND_TRIP_QUICK_DATE_PICKER,
} from '../../../common/constants/commonСonstants';
import { sendMessage } from '../../../common/utils/utils';
import findTripDateListeners from './findTripDateListeners';
import { goToMenuKeyboard, findTripsDaysAndCalendarKeyboard } from '../../keyboards/keyboards';

class findTripDateModule {
    async runStartTripDatePicker(bot, msg) {
        await sendMessage(bot, msg.chat.id, FIND_TRIP_QUICK_DATE_PICKER, goToMenuKeyboard);
        await sendMessage(bot, msg.chat.id, CALENDAR_CONGRATS_MESSAGE_START, { parse_mode: 'HTML', ...findTripsDaysAndCalendarKeyboard });
    }

    setListeners(bot) {
        findTripDateListeners(bot)
    }
}

export default findTripDateModule;
