import { FIND_TRIP_QUICK_DATE_PICKER, FIND_TRIP_SEARCH_TRIPS } from '../../../common/constants/commonСonstants';
import { FIND_TRIPS_KEYBOARDS_DAY } from '../../../common/constants/findTripConstants';
import { showFoundTrips, handlesSaveNewFindTripDateToDb } from './foundTripsUtils';
import { parseData, sendMessage } from '../../../common/utils/utils';
import { goToMenuKeyboard } from '../../keyboards/keyboards';

const foundTripsListeners = bot => {
    bot.on('message', async (msg) => {
        switch (msg.text) {
            case FIND_TRIP_SEARCH_TRIPS: {
                showFoundTrips(bot, msg.chat.id);
                await sendMessage(bot, msg.chat.id, FIND_TRIP_QUICK_DATE_PICKER, goToMenuKeyboard);
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
                await showFoundTrips(bot, id, payload);
                await handlesSaveNewFindTripDateToDb(id, payload);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default foundTripsListeners;
