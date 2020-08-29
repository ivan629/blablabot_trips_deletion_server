import { tripPriceSettingsKeyboardFinish } from '../keyboards/keyboards';
import { setTripPrice } from '../../services/helpers';
import { sendMessage } from '../../common/utils/utils';
import {
    TRIP_PRICE_SETTINGS_FINISH_MESSAGE,
    TRIP_PRICE_BLOCKED_MESSAGE,
} from '../../common/constants/commonСonstants';


export const sendInitialMessage = (bot, msg) => {
    // sendMessage(bot, msg.chat.id, TRIP_PRICE_SETTINGS_INITIAL_MESSAGE, tripPriceSettingsKeyboardInitial)
};

export const handlePriceSetting = async (bot, msg, id) => {
    const isOnlyNumbers = /^(?!(0))\d+$/.test(msg.text);
    const formattedPrice = Math.abs(parseInt(msg.text));

    if (isOnlyNumbers) {
        await setTripPrice(id, formattedPrice);
        sendMessage(bot, id, TRIP_PRICE_SETTINGS_FINISH_MESSAGE, { parse_mode: 'HTML', ...tripPriceSettingsKeyboardFinish })
    } else {
        sendMessage(bot, id, TRIP_PRICE_BLOCKED_MESSAGE);
    }
};

export const sendTripPriceBlockedMessage = (bot, msg) => {
    sendMessage(bot, msg.chat.id, TRIP_PRICE_BLOCKED_MESSAGE)
};
