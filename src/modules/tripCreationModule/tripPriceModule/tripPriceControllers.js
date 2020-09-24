import { tripPriceSettingsKeyboardFinish } from '../../keyboards/keyboards';
import { setTripPrice } from '../../../services/helpers';
import { sendMessage } from '../../../common/utils/utils';
import { keysActions, getLocalizedMessage } from '../../../common/messages';

export const handlePriceSetting = async (bot, msg, id) => {
    const isOnlyNumbers = /^(?!(0))\d+$/.test(msg.text);
    const formattedPrice = Math.abs(parseInt(msg.text));

    if (isOnlyNumbers) {
        await setTripPrice(id, formattedPrice);
        sendMessage(
            bot,
            id,
            getLocalizedMessage(
                keysActions.TRIP_PRICE_SETTINGS_FINISH_MESSAGES_KEY,
                msg
            ),
            { parse_mode: 'HTML', ...tripPriceSettingsKeyboardFinish(msg) }
        );
    } else {
        sendMessage(
            bot,
            id,
            getLocalizedMessage(
                keysActions.TRIP_PRICE_BLOCKED_MESSAGES_KEY,
                msg
            )
        );
    }
};

export const sendTripPriceBlockedMessage = (bot, msg) => {
    sendMessage(
        bot,
        msg.chat.id,
        getLocalizedMessage(keysActions.TRIP_PRICE_BLOCKED_MESSAGES_KEY, msg)
    );
};
