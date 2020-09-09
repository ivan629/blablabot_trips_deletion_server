import {
    MY_TRIPS,
    REMOVE_TRIP_BUTTON,
    SHOW_I_AM_DRIVING_MESSAGE,
    SHOW_BOOKED_TRIPS_MESSAGE,
    CANCEL_TRIP_BOOKING_ACTION,
    TRIP_PASSENGERS_BUTTON_ACTION
} from '../../common/constants/commonСonstants';
import {
    removeTrip,
    showPassengers,
    cancelTripBooking,
    sendBookedTripsList,
    handleShowRolesKeyboard,
    sendOwnDrivingTripsList,
} from './myTripsUtils';
import { parseData } from '../../common/utils/utils';

const myTripsModule = bot => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);

        switch (data.type) {
            case REMOVE_TRIP_BUTTON: {
                removeTrip(bot, query);
            }
                break;
            case CANCEL_TRIP_BOOKING_ACTION: {
                cancelTripBooking(bot, query);
            }
                break;
            case TRIP_PASSENGERS_BUTTON_ACTION: {
                showPassengers(bot, query);
            }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('message', async msg => {
        switch (msg.text) {
            case MY_TRIPS: {
                handleShowRolesKeyboard(bot, msg);
            }
                break;
            case SHOW_I_AM_DRIVING_MESSAGE: {
                sendOwnDrivingTripsList(bot, msg);
            }
                break;
            case SHOW_BOOKED_TRIPS_MESSAGE: {
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
