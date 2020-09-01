import {
    FIND_TRIP_MONTH_DOWN,
    FIND_TRIP_MONTH_UP,
    FIND_TRIP_DATE_CHANGED,
} from '../../../common/constants/commonСonstants';
import {
    userFindTripChangedDate,
    changeFindTripCalendarMonth,
} from './calendarControllers';
import { parseData } from '../../../common/utils/utils';

const findTripDateListeners = (bot) => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);

        switch (data.type) {
            case FIND_TRIP_MONTH_DOWN: {
                changeFindTripCalendarMonth(query, bot);
            }
                break;
            case FIND_TRIP_MONTH_UP: {
                changeFindTripCalendarMonth(query, bot, true)
            }
                break;
            case FIND_TRIP_DATE_CHANGED: {
                userFindTripChangedDate(query, bot);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default findTripDateListeners;
