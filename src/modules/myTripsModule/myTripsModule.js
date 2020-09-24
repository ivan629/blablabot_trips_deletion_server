import {
    REMOVE_TRIP_BUTTON_ACTION,
    CANCEL_TRIP_BOOKING_ACTION,
    TRIP_PASSENGERS_BUTTON_ACTION,
} from '../../common/messages/myTrips/myTripsKeysActions';
import {
    removeTrip,
    showPassengers,
    cancelTripBooking,
    sendBookedTripsList,
    handleShowRolesKeyboard,
    sendOwnDrivingTripsList,
} from './myTripsUtils';
import { keysActions } from '../../common/messages';
import { parseData } from '../../common/utils/utils';
import { listenerCase } from '../../common/utils/listenersUtils';

const myTripsModule = (bot) => {
    bot.on('callback_query', (query) => {
        const data = parseData(query.data);

        switch (data.type) {
            case REMOVE_TRIP_BUTTON_ACTION:
                {
                    removeTrip(bot, query);
                }
                break;
            case CANCEL_TRIP_BOOKING_ACTION:
                {
                    cancelTripBooking(bot, query);
                }
                break;
            case TRIP_PASSENGERS_BUTTON_ACTION:
                {
                    showPassengers(bot, query);
                }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('message', async (msg) => {
        if (listenerCase(keysActions.MY_TRIPS_MESSAGES_KEY, msg.text)) {
            return handleShowRolesKeyboard(bot, msg);
        }

        if (
            listenerCase(keysActions.SHOW_I_AM_DRIVING_MESSAGES_KEY, msg.text)
        ) {
            return sendOwnDrivingTripsList(bot, msg);
        }

        if (
            listenerCase(keysActions.SHOW_BOOKED_TRIPS_MESSAGES_KEY, msg.text)
        ) {
            return sendBookedTripsList(bot, msg);
        }
    });
};

export default myTripsModule;
