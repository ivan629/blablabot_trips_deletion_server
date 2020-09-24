import {
    calendarChangedDate,
    calendarChangeMonth,
} from './calendarComponentUtils';
import { parseData } from '../../utils/utils';
import { keysActions } from '../../messages';

const calendarComponentListeners = (bot) => {
    bot.on('callback_query', (query) => {
        const { type } = parseData(query.data);
        switch (type) {
            case keysActions.MONTH_DOWN_ACTION:
                {
                    calendarChangeMonth(query, bot);
                }
                break;
            case keysActions.MONTH_UP_ACTION:
                {
                    calendarChangeMonth(query, bot, true);
                }
                break;
            case keysActions.DATE_CHANGED_ACTION:
                {
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
