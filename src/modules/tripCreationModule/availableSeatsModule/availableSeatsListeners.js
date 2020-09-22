import { keysActions } from '../../../common/messages';
import { parseData } from '../../../common/utils/utils'
import { listenerCase } from '../../../common/utils/listenersUtils'
import { setAvailableSeatsData, sendAvailableSeatsBlockedMessage } from './availableSeatsUtils';
import { SET_AVAILABLE_SEATS_CUNT } from '../../../common/messages/tripCreationMessages/availableSeatsKeysActions';

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

    bot.on('message', async msg => {
        if (listenerCase(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED_KEY, msg.text)) {
            return sendAvailableSeatsBlockedMessage(bot, msg);
        }
    });
};

export default AvailableSeatsListeners;
