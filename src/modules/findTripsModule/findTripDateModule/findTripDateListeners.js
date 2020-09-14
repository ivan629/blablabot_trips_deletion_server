import { parseData } from '../../../common/utils/utils';
import { FIND_TRIPS_KEYBOARDS_DAY } from '../../../common/constants/findTripConstants';
import { sendFindTripCalendar } from './findTripDateUtils';


const findTripDateListeners = (bot) => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);
        const { message: { chat: { id }} } = query;

        switch (data.type) {
            case FIND_TRIPS_KEYBOARDS_DAY[3]: {
                sendFindTripCalendar(bot, id, query)
            }
            default: {
                break;
            }
        }
    });
};

export default findTripDateListeners;
