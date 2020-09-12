import { sendMessage } from '../../../common/utils/utils';
import { calendarKeyboard } from '../../keyboards/keyboards';
import tripCreationCalendarContainer from './tripCreationCalendarContainer';
import { tripCreationMessages, keysActions } from '../../../common/messages/tripCreationMessages'
import tripDateListeners from '../../../modules/tripCreationModule/tripDateModule/tripDateListeners';
import { getIsStartDateCreatingCompleted, toggleIsTripStartDateCompleted } from '../../../services/helpers';

class tripDateModule {
    runStartTripDatePicker(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        this.sendCalendar(tripCreationMessages(keysActions.CALENDAR_START_TRIP_KEY), true)
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
            ? tripCreationMessages(keysActions.CALENDAR_CONGRATS_MESSAGES_STOP_KEY)
            : tripCreationMessages(keysActions.CALENDAR_CONGRATS_MESSAGE_START_KEY);
        const calendar = await tripCreationCalendarContainer({
            bot: this.bot,
            chat_id: this.msg.chat.id,
        });

        sendMessage(this.bot, this.msg.chat.id, congratsMessage, { parse_mode: 'HTML', ...calendar });
        sendMessage(this.bot, this.msg.chat.id, tripCreationMessages(keysActions.CALENDAR_HELP_MESSAGE_KEY), {
            parse_mode: 'HTML',
            ...calendarKeyboard(tripCreationMessages(keysActions.BLOCKED_GO_TO_TIME_PICKER_KEYBOARD_KEY)),
        });
    }
}

export default tripDateModule;
