import {
    MONTH_UP,
    MONTH_DOWN,
    DATE_CHANGED,
} from '../../constants/commonСonstants';
import {
    calendarChangedDate,
    calendarChangeMonth,
} from './calendarComponentUtils';
import { parseData } from '../../utils/utils';


const calendarComponentListeners = bot => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);
        switch (data.type) {
            case MONTH_DOWN: {
                calendarChangeMonth(query, bot);
            }
                break;
            case MONTH_UP: {
                calendarChangeMonth(query, bot, true)
            }
                break;
            case DATE_CHANGED: {
                calendarChangedDate(query, bot);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default calendarComponentListeners;
