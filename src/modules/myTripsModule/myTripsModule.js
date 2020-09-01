import { MY_TRIPS, REMOVE_TRIP_BUTTON } from '../../common/constants/commonСonstants';
import { sendTripsList, removeTrip } from './myTripsHelpers';
import { parseData } from '../../common/utils/utils';

const myTripsModule = bot => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);

        switch (data.type) {
            case REMOVE_TRIP_BUTTON: {
                removeTrip(bot, query);
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
              sendTripsList(bot, msg)
            }

                break;
            default: {
                break;
            }
        }
    });
};

export default myTripsModule;
