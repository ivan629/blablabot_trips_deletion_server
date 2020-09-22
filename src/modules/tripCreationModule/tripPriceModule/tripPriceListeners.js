import { listenerCase } from '../../../common/utils/listenersUtils';
import { sendMessage, getIsBotMessage } from '../../../common/utils/utils';
import { keysActions, getLocalizedMessage } from '../../../common/messages';
import { tripPriceSettingsKeyboardInitial } from '../../keyboards/keyboards';
import { handlePriceSetting, sendTripPriceBlockedMessage } from './tripPriceControllers';
import { getIsTripPriceSettings, toggleIsTripPriceCreating } from '../../../services/helpers';

const tripPriceListeners = (bot) => {
    bot.on('message', async msg => {
        const {chat: {id}} = msg;
        const shouldListenTripPrice = await getIsTripPriceSettings(id);

        if (!getIsBotMessage(msg.text) && shouldListenTripPrice) {
            return await handlePriceSetting(bot, msg, id)
        }

        if (listenerCase(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_KEY, msg.text)) {
            await toggleIsTripPriceCreating(msg.chat.id, true);
            return sendMessage(
                bot,
                msg.chat.id,
                getLocalizedMessage(keysActions.SET_TRIP_PRICE_INITIAL_MESSAGES_KEY, msg),
                tripPriceSettingsKeyboardInitial(msg),
            );
        }

        if (listenerCase(keysActions.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES_KEY, msg.text)) {
            return sendTripPriceBlockedMessage(bot, msg);
        }

        if (listenerCase(keysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY, msg.text)) {
            return await toggleIsTripPriceCreating(msg.chat.id, false);
        }
    });
};

export default tripPriceListeners;
