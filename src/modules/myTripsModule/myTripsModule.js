import {
    CANCEL_TRIP_BOOKING_ACTION,
    REMOVE_TRIP_BUTTON_ACTION,
} from '../../common/messages/myTrips/myTripsKeysActions';
import {
    removeTrip,
    cancelTripBooking,
    sendBookedTripsList,
    handleShowRolesKeyboard,
    sendOwnDrivingTripsList,
} from './myTripsUtils';
import { parseData } from '../../common/utils/utils';
import { getLocalizedMessage, keysActions } from '../../common/messages';

const myTripsModule = bot => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);

        switch (data.type) {
            case REMOVE_TRIP_BUTTON_ACTION: {
                removeTrip(bot, query);
            }
                break;
            case CANCEL_TRIP_BOOKING_ACTION: {
                cancelTripBooking(bot, query);
            }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('message', async msg => {
        switch (msg.text) {
            case getLocalizedMessage(keysActions.MY_TRIPS_MESSAGES_KEY): {
                handleShowRolesKeyboard(bot, msg);
            }
                break;
            case getLocalizedMessage(keysActions.SHOW_I_AM_DRIVING_MESSAGES_KEY, msg): {
                sendOwnDrivingTripsList(bot, msg);
            }
                break;
            case getLocalizedMessage(keysActions.SHOW_BOOKED_TRIPS_MESSAGES_KEY, msg): {
                sendBookedTripsList(bot, msg);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default myTripsModule;
