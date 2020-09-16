import { sendMessage } from '../../../common/utils/utils';
import { calendarKeyboard } from '../../keyboards/keyboards';
import calendarComponent from '../../../common/components/calendarComponent/calendarComponent';
import { getLocalizedMessage, keysActions } from '../../../common/messages';

export const sendFindTripCalendar = async (bot, chat_id, query) => {
    const calendar = await calendarComponent({ bot, chat_id, eventObject: query });
    sendMessage(bot, chat_id, getLocalizedMessage(keysActions.CALENDAR_CONGRATS_START_MESSAGES_KEY, query), { parse_mode: 'HTML', ...calendar });
    sendMessage(bot, chat_id, getLocalizedMessage(keysActions.FIND_TRIP_CONGRATS_STOP_MESSAGES_KEY, query), {
        parse_mode: 'HTML',
        ...calendarKeyboard(getLocalizedMessage(keysActions.FIND_TRIP_SEARCH_TRIPS_BLOCKED_MESSAGES_KEY, query), query),
    });
};
