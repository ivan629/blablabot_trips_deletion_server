import { getIsTripPriceSettings, toggleIsTripPriceCreating } from '../../../services/helpers';
import { sendMessage, getIsBotMessage } from '../../../common/utils/utils';
import { tripPriceSettingsKeyboardInitial } from '../../keyboards/keyboards';
import { handlePriceSetting, sendTripPriceBlockedMessage } from './tripPriceControllers';
import { keysActions, getLocalizedMessage } from '../../../common/messages';

const tripPriceListeners = (bot) => {
    bot.on('message', async msg => {
        const { chat: { id } } = msg;
        const shouldListenTripPrice = await getIsTripPriceSettings(id);

        if (!getIsBotMessage(msg.text) && shouldListenTripPrice) {
            await handlePriceSetting(bot, msg, id)
        }

        switch (msg.text) {
            case getLocalizedMessage(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_KEY, msg): {
                await toggleIsTripPriceCreating(msg.chat.id, true);
                sendMessage(
                    bot,
                    msg.chat.id,
                    getLocalizedMessage(keysActions.SET_TRIP_PRICE_INITIAL_MESSAGES_KEY, msg),
                    tripPriceSettingsKeyboardInitial(msg),
                    );
            }
                break;
            case getLocalizedMessage(keysActions.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES_KEY, msg): {
                await sendTripPriceBlockedMessage(bot, msg);
            }
                break;
            case getLocalizedMessage(keysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY, msg): {
                await toggleIsTripPriceCreating(msg.chat.id, false);
            }
                break;
            default: {
                break;
            }
        }
    });
};


export default tripPriceListeners;
