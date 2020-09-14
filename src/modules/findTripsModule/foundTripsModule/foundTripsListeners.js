import {
    BOOK_TRIP_ACTION,
    UNBOOK_TRIP_ACTION,
    FIND_TRIP_SEARCH_TRIPS,
    FIND_TRIP_QUICK_DATE_PICKER,
} from '../../../common/constants/commonСonstants';
import { FIND_TRIPS_KEYBOARDS_DAY } from '../../../common/constants/findTripConstants';
import {
    showFoundTrips,
    handlesSaveNewFindTripDateToDb,
} from './foundTripsUtils';
import { handleBookTrip, handleUnBookTrip } from './bookTipUtils'
import { parseData, sendMessage } from '../../../common/utils/utils';
import { goToMenuKeyboard } from '../../keyboards/keyboards';

const foundTripsListeners = bot => {
    bot.on('message', async (msg) => {
        switch (msg.text) {
            case FIND_TRIP_SEARCH_TRIPS: {
                showFoundTrips(bot, msg.chat.id);
                await sendMessage(bot, msg.chat.id, FIND_TRIP_QUICK_DATE_PICKER, goToMenuKeyboard(msg));
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
            case FIND_TRIPS_KEYBOARDS_DAY[0]:
            case FIND_TRIPS_KEYBOARDS_DAY[1]:
            case FIND_TRIPS_KEYBOARDS_DAY[2]: {
                await handlesSaveNewFindTripDateToDb(id, payload);
                await showFoundTrips(bot, id, payload);
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
