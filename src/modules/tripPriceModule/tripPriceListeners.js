import { getIsTripPriceSettings, toggleIsTripPriceCreating } from '../../services/helpers';
import {
    CONFIRM_TRIP_PRICE,
    SET_TRIP_PRICE_MESSAGE_INITIAL,
    GO_TO_TRIP_PRICE_SETTINGS,
    CONFIRM_TRIP_PRICE_BLOCKED,
} from '../../common/constants/commonСonstants';
import { handlePriceSetting, sendTripPriceBlockedMessage } from './tripPriceControllers';
import { tripPriceSettingsKeyboardInitial } from '../keyboards/keyboards';
import { sendMessage, getIsBotMessage } from '../../common/utils/utils';

const tripPriceListeners = (bot) => {
    bot.on('message', async msg => {
        const { chat: { id } } = msg;
        const shouldListenTripPrice = await getIsTripPriceSettings(id);

        console.log(msg.text);
        if (!getIsBotMessage(msg.text) && shouldListenTripPrice) {
            await handlePriceSetting(bot, msg, id)
        }

        switch (msg.text) {
            case GO_TO_TRIP_PRICE_SETTINGS: {
                await toggleIsTripPriceCreating(msg.chat.id, true);
                sendMessage(bot, msg.chat.id, SET_TRIP_PRICE_MESSAGE_INITIAL, tripPriceSettingsKeyboardInitial);
            }
                break;
            case CONFIRM_TRIP_PRICE_BLOCKED: {
                await sendTripPriceBlockedMessage(bot, msg);
            }
                break;
            case CONFIRM_TRIP_PRICE: {
                await toggleIsTripPriceCreating(msg.chat.id, false);
            }
                break;
            default: {
                break;
            }
        }
    });
    bot.on('callback_query', query => {
        const data = JSON.parse(query.data);

    });
};


export default tripPriceListeners;
