import { FIND_TRIP_SEARCH_TRIPS } from '../../../common/constants/commonСonstants';
import { showFoundTrips } from './foundTripsUtils';

const foundTripsListeners = bot => {
    bot.on('message', async (msg) => {
        switch (msg.text) {
            case FIND_TRIP_SEARCH_TRIPS: {
                showFoundTrips(bot, msg);
            }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('callback_query', async query => {

    });
};

export default foundTripsListeners;
