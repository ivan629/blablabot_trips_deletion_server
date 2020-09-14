import  { parseData } from '../../../common/utils/utils'
import { setAvailableSeatsData, sendAvailableSeatsBlockedMessage } from './availableSeatsUtils';
import { SET_AVAILABLE_SEATS_CUNT } from '../../../common/messages/tripCreationMessages/availableSeatsKeysActions';
import { keysActions, tripCreationMessages } from '../../../common/messages/tripCreationMessages';

const AvailableSeatsListeners = bot => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);

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
            case tripCreationMessages(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED_KEY, msg): {
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
