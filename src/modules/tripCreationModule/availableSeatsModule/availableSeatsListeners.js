import {
    SET_AVAILABLE_SEATS_CUNT,
    GO_TO_TRIP_PRICE_SETTINGS_BLOCKED,
} from '../../../common/constants/commonСonstants';
import { setAvailableSeatsData, sendAvailableSeatsBlockedMessage } from '../../../modules/tripCreationModule/availableSeatsModule/availableSeatsHelpers';

const AvailableSeatsListeners = bot => {
    bot.on('callback_query', query => {
        const data = JSON.parse(query.data);

        switch (data.type) {
            case SET_AVAILABLE_SEATS_CUNT: {
                setAvailableSeatsData(bot, query);
            }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('message', async (msg) => {
        switch (msg.text) {
            case GO_TO_TRIP_PRICE_SETTINGS_BLOCKED: {
                sendAvailableSeatsBlockedMessage(bot, msg);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default AvailableSeatsListeners;
