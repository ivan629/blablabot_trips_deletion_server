import CalendarComponent from './calendarComponent';
import {
    CALENDAR_START_TRIP_MESSAGE,
    CALENDAR_STOP_TRIP_MESSAGE,
    CALENDAR_CONGRATS_MESSAGE,
} from '../../common/constants/commonСonstants';
import tripDateListeners from './tripDateListeners';
import { sendMessageAndRemoveKeyboard } from '../../common/utils/utils';
import { showTripEndCalendarComponent } from './calendarControllers';

const calendarComponent = new CalendarComponent();

class tripDateModule {
    runStartTripDatePicker(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        this.sendCalendar(CALENDAR_START_TRIP_MESSAGE)
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

    sendCalendar(message) {
        sendMessageAndRemoveKeyboard(this.bot, this.msg.chat.id, CALENDAR_CONGRATS_MESSAGE);
        this.bot.sendMessage(this.msg.chat.id, message, calendarComponent.getCalendar());
    }
}

export default tripDateModule;
