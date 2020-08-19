import CalendarComponent from './calendarComponent';
import { CALENDAR_INITIAL_MESSAGE, CALENDAR_CONGRATS_MESSAGE } from '../../common/constants/commonСonstants';
import tripDateListeners from './tripDateListeners';
import { sendMessageAndRemoveKeyboard } from '../../common/utils/utils';

const calendarComponent = new CalendarComponent();

class tripDateModule {
    start(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        this.sendCalendar()
    }

    setListeners(bot) {
        tripDateListeners(bot)
    }

    sendCalendar() {
        sendMessageAndRemoveKeyboard(this.bot, this.msg.chat.id, CALENDAR_CONGRATS_MESSAGE);
        this.bot.sendMessage(this.msg.chat.id, CALENDAR_INITIAL_MESSAGE, calendarComponent.getCalendar());
    }
}

export default tripDateModule;
