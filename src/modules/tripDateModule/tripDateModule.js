import CalendarComponent from './calendarComponent';
import {
    CALENDAR_START_TRIP_MESSAGE,
    CALENDAR_CONGRATS_MESSAGE_START,
    CALENDAR_CONGRATS_MESSAGE_STOP,
    CALENDAR_HELP_MESSAGE,
    BLOCKED_GO_TO_TIME_PICKER,
} from '../../common/constants/commonСonstants';
import tripDateListeners from './tripDateListeners';
import { sendMessage } from '../../common/utils/utils';
import { calendarKeyboard } from '../keyboards/keyboards';
import { showTripEndCalendarComponent } from './calendarControllers';
import { getIsStartDateCreatingCompleted } from '../../services/helpers';

const calendarComponent = new CalendarComponent();

class tripDateModule {
    runStartTripDatePicker(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        this.sendCalendar(CALENDAR_START_TRIP_MESSAGE, true)
    }

    async runStopTripDatePicker(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        await showTripEndCalendarComponent(this.msg, this.bot);
        this.sendCalendar()
    }

    setListeners(bot) {
        tripDateListeners(bot)
    }

    async sendCalendar() {
        const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(this.msg.chat.id);
        const congratsMessage = isStartDateCreatingCompleted ? CALENDAR_CONGRATS_MESSAGE_STOP: CALENDAR_CONGRATS_MESSAGE_START;
        const calendar = await calendarComponent.getCalendar({ chat_id: this.msg.chat.id });

        sendMessage(this.bot, this.msg.chat.id, congratsMessage, { parse_mode: 'HTML', ...calendar });
        sendMessage(this.bot, this.msg.chat.id, CALENDAR_HELP_MESSAGE, {
            parse_mode: 'HTML',
            ...calendarKeyboard(BLOCKED_GO_TO_TIME_PICKER),
        });
    }
}

export default tripDateModule;
