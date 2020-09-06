import { sendMessage } from '../../../common/utils/utils';
import { calendarKeyboard } from '../../keyboards/keyboards';
import {
    FIND_TRIP_SEARCH_TRIPS_BLOCKED,
    CALENDAR_CONGRATS_MESSAGE_START,
    FIND_TRIP_CONGRATS_MESSAGE_STOP,
} from '../../../common/constants/commonСonstants';
import calendarComponent from '../../../common/components/calendarComponent/calendarComponent';

export const sendFindTripCalendar = async (bot, chat_id) => {
    const calendar = await calendarComponent({ bot, chat_id });
    sendMessage(bot, chat_id, CALENDAR_CONGRATS_MESSAGE_START, { parse_mode: 'HTML', ...calendar });
    sendMessage(bot, chat_id, FIND_TRIP_CONGRATS_MESSAGE_STOP, {
        parse_mode: 'HTML',
        ...calendarKeyboard(FIND_TRIP_SEARCH_TRIPS_BLOCKED),
    });
};
