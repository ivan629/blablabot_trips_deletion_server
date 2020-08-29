import CalendarComponent from './calendarComponent';
import {
    CALENDAR_START_TRIP_MESSAGE,
    CALENDAR_STOP_TRIP_MESSAGE,
    CALENDAR_CONGRATS_MESSAGE_START,
    CALENDAR_CONGRATS_MESSAGE_STOP,
    CALENDAR_HELP_MESSAGE,
    BLOCKED_GO_TO_TIME_PICKER,
} from '../../common/constants/commonСonstants';
import tripDateListeners from './tripDateListeners';
import { sendMessageAndRemoveKeyboard, sendMessage } from '../../common/utils/utils';
import { showTripEndCalendarComponent } from './calendarControllers';
import { calendarKeyboard } from '../keyboards/keyboards';

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

    async sendCalendar(message, isStart) {
        const congratsMessage = isStart ? CALENDAR_CONGRATS_MESSAGE_START : CALENDAR_CONGRATS_MESSAGE_STOP;
        sendMessage(this.bot, this.msg.chat.id, congratsMessage, {
            parse_mode: 'HTML',
            ...calendarComponent.getCalendar(),
        });
        sendMessage(this.bot, this.msg.chat.id, CALENDAR_HELP_MESSAGE, {
            parse_mode: 'HTML',
            ...calendarKeyboard(BLOCKED_GO_TO_TIME_PICKER),
        });
    }
}

export default tripDateModule;
