import {
    showFoundTrips,
    handlesSaveNewFindTripDateToDb,
} from './foundTripsUtils';
import { handleBookTrip, handleUnBookTrip } from './bookTipUtils'
import { parseData, sendMessage } from '../../../common/utils/utils';
import { goToMenuKeyboard } from '../../keyboards/keyboards';
import { BOOK_TRIP_ACTION, UNBOOK_TRIP_ACTION } from '../../../common/messages/myTrips/myTripsKeysActions';
import { getLocalizedMessage, keysActions } from '../../../common/messages';

const foundTripsListeners = bot => {
    bot.on('message', async (msg) => {
        switch (msg.text) {
            case getLocalizedMessage(keysActions.FIND_TRIP_SEARCH_TRIPS_MESSAGES_KEY, msg): {
                showFoundTrips(bot, msg.chat.id);
                await sendMessage(bot, msg.chat.id, getLocalizedMessage(keysActions.FIND_TRIP_QUICK_DATE_PICKER_MESSAGES_KEY, msg), goToMenuKeyboard(msg));
            }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('callback_query', async query => {
        const { message: { chat: { id }}, data } = query;
        const { type, payload } = parseData(data);

        switch (type) {
            case getLocalizedMessage(keysActions.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES_KEY, query)[0]:
            case getLocalizedMessage(keysActions.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES_KEY, query)[1]:
            case getLocalizedMessage(keysActions.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES_KEY, query)[2]: {
                await handlesSaveNewFindTripDateToDb(id, payload);
                await showFoundTrips(bot, query, id, payload);
            }
                break;
            case BOOK_TRIP_ACTION: {
                await handleBookTrip(bot, query);
            }
                break;
            case UNBOOK_TRIP_ACTION: {
                await handleUnBookTrip(bot, query);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default foundTripsListeners;
