import {
    CALENDAR_START_TRIP_MESSAGE,
    CALENDAR_CONGRATS_MESSAGE_START,
    CALENDAR_CONGRATS_MESSAGE_STOP,
    CALENDAR_HELP_MESSAGE,
    BLOCKED_GO_TO_TIME_PICKER,
} from '../../../common/constants/commonСonstants';
import { getIsStartDateCreatingCompleted, toggleIsTripStartDateCompleted } from '../../../services/helpers';
import { calendarKeyboard } from '../../keyboards/keyboards';
import { sendMessage } from '../../../common/utils/utils';
import tripDateListeners from '../../../modules/tripCreationModule/tripDateModule/tripDateListeners';
import tripCreationCalendarContainer from './tripCreationCalendarContainer';


class tripDateModule {
    runStartTripDatePicker(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        this.sendCalendar(CALENDAR_START_TRIP_MESSAGE, true)
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
        const congratsMessage = isStartDateCreatingCompleted ? CALENDAR_CONGRATS_MESSAGE_STOP: CALENDAR_CONGRATS_MESSAGE_START;
        const calendar = await tripCreationCalendarContainer({
            bot: this.bot,
            chat_id: this.msg.chat.id,
        });

        sendMessage(this.bot, this.msg.chat.id, congratsMessage, { parse_mode: 'HTML', ...calendar });
        sendMessage(this.bot, this.msg.chat.id, CALENDAR_HELP_MESSAGE, {
            parse_mode: 'HTML',
            ...calendarKeyboard(BLOCKED_GO_TO_TIME_PICKER),
        });
    }
}

export default tripDateModule;
