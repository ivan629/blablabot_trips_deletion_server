import {
    FIND_TRIP_SEARCH_TRIPS_BLOCKED,
    FIND_TRIP_CONGRATS_MESSAGE_STOP,
    CALENDAR_CONGRATS_MESSAGE_START,
} from '../../../common/constants/commonСonstants';
import { sendMessage } from '../../../common/utils/utils';
import findTripDateListeners from './findTripDateListeners';
import { calendarKeyboard } from '../../keyboards/keyboards';
import CalendarComponent from './findTripcalendarComponent';

const calendarComponent = new CalendarComponent();

class findTripDateModule {
    runStartTripDatePicker(bot, msg) {
        this.bot = bot;
        this.msg = msg;

        this.sendCalendar()
    }

    setListeners(bot) {
        findTripDateListeners(bot)
    }

    async sendCalendar() {
        const calendar = await calendarComponent.getCalendar({ chat_id: this.msg.chat.id });

        sendMessage(this.bot, this.msg.chat.id, CALENDAR_CONGRATS_MESSAGE_START, { parse_mode: 'HTML', ...calendar });
        sendMessage(this.bot, this.msg.chat.id, FIND_TRIP_CONGRATS_MESSAGE_STOP, {
            parse_mode: 'HTML',
            ...calendarKeyboard(FIND_TRIP_SEARCH_TRIPS_BLOCKED),
        });
    }
}

export default findTripDateModule;
