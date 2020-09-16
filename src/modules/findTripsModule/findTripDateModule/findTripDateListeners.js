import { parseData } from '../../../common/utils/utils';
import { sendFindTripCalendar } from './findTripDateUtils';
import { getLocalizedMessage, keysActions } from '../../../common/messages';

const findTripDateListeners = (bot) => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);
        const { message: { chat: { id }} } = query;

        switch (data.type) {
            case getLocalizedMessage(keysActions.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES_KEY, query)[3]: {
                sendFindTripCalendar(bot, id, query)
            }
            default: {
                break;
            }
        }
    });
};

export default findTripDateListeners;
