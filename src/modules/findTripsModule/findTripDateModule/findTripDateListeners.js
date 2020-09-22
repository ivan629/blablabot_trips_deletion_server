import { parseData } from '../../../common/utils/utils';
import { sendFindTripCalendar } from './findTripDateUtils';
import { keysActions } from '../../../common/messages';

const findTripDateListeners = (bot) => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);
        const { message: { chat: { id }} } = query;

        switch (data.type) {
            case keysActions.FIND_TRIPS_KEYBOARDS_CALENDAR_MESSAGES_KEY: {
                sendFindTripCalendar(bot, id, query)
            }
            default: {
                break;
            }
        }
    });
};

export default findTripDateListeners;
