import CalendarComponent from './calendarComponent';
import {
    CALENDAR_START_TRIP_MESSAGE,
    CALENDAR_STOP_TRIP_MESSAGE,
    CALENDAR_CONGRATS_MESSAGE_START,
    CALENDAR_CONGRATS_MESSAGE_STOP,
} from '../../common/constants/commonСonstants';
import tripDateListeners from './tripDateListeners';
import { sendMessageAndRemoveKeyboard, sendMessage } from '../../common/utils/utils';
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
        this.sendCalendar(CALENDAR_STOP_TRIP_MESSAGE)
    }

    setListeners(bot) {
        tripDateListeners(bot)
    }

    async sendCalendar(message, isStart) {
        const congratsMessage = isStart ? CALENDAR_CONGRATS_MESSAGE_START : CALENDAR_CONGRATS_MESSAGE_STOP;
        sendMessageAndRemoveKeyboard(this.bot, this.msg.chat.id, congratsMessage);
        sendMessage(this.bot, this.msg.chat.id, message, calendarComponent.getCalendar());
    }
}

export default tripDateModule;
