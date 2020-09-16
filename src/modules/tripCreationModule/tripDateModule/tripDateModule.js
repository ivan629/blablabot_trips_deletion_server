import { sendMessage } from '../../../common/utils/utils';
import { calendarKeyboard } from '../../keyboards/keyboards';
import tripCreationCalendarContainer from './tripCreationCalendarContainer';
import { getLocalizedMessage, keysActions } from '../../../common/messages'
import tripDateListeners from '../../../modules/tripCreationModule/tripDateModule/tripDateListeners';
import { getIsStartDateCreatingCompleted, toggleIsTripStartDateCompleted } from '../../../services/helpers';

class tripDateModule {
    runStartTripDatePicker(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        this.sendCalendar(getLocalizedMessage(keysActions.CALENDAR_START_TRIP_KEY, msg), true)
    }

    setListeners(bot) {
        tripDateListeners(bot)
    }

    async runStopTripDatePicker(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        await toggleIsTripStartDateCompleted(msg.chat.id);
        this.sendCalendar()
    }

    async sendCalendar() {
        const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(this.msg.chat.id);
        const congratsMessage = isStartDateCreatingCompleted
            ? getLocalizedMessage(keysActions.CALENDAR_CONGRATS_MESSAGES_STOP_KEY, this.msg)
            : getLocalizedMessage(keysActions.CALENDAR_CONGRATS_MESSAGE_START_KEY, this.msg);
        const calendar = await tripCreationCalendarContainer({
            bot: this.bot,
            chat_id: this.msg.chat.id,
            eventObject: this.msg,
        });

        sendMessage(this.bot, this.msg.chat.id, congratsMessage, { parse_mode: 'HTML', ...calendar });
        sendMessage(this.bot, this.msg.chat.id, getLocalizedMessage(keysActions.CALENDAR_HELP_MESSAGE_KEY, this.msg), {
            parse_mode: 'HTML',
            ...calendarKeyboard(getLocalizedMessage(keysActions.BLOCKED_GO_TO_TIME_PICKER_KEYBOARD_KEY, this.msg), this.msg),
        });
    }
}

export default tripDateModule;
