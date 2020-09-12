import { getIsTripPriceSettings, toggleIsTripPriceCreating } from '../../../services/helpers';
import { sendMessage, getIsBotMessage } from '../../../common/utils/utils';
import { tripPriceSettingsKeyboardInitial } from '../../keyboards/keyboards';
import { handlePriceSetting, sendTripPriceBlockedMessage } from './tripPriceControllers';
import { keysActions, tripCreationMessages } from '../../../common/messages/tripCreationMessages';

const tripPriceListeners = (bot) => {
    bot.on('message', async msg => {
        const { chat: { id } } = msg;
        const shouldListenTripPrice = await getIsTripPriceSettings(id);

        if (!getIsBotMessage(msg.text) && shouldListenTripPrice) {
            await handlePriceSetting(bot, msg, id)
        }

        switch (msg.text) {
            case tripCreationMessages(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_KEY): {
                await toggleIsTripPriceCreating(msg.chat.id, true);
                sendMessage(
                    bot,
                    msg.chat.id,
                    tripCreationMessages(keysActions.SET_TRIP_PRICE_INITIAL_MESSAGES_KEY),
                    tripPriceSettingsKeyboardInitial,
                    );
            }
                break;
            case tripCreationMessages(keysActions.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES_KEY): {
                await sendTripPriceBlockedMessage(bot, msg);
            }
                break;
            case tripCreationMessages(keysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY): {
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
