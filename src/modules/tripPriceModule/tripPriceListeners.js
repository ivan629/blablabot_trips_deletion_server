import { getIsTripPriceSettings, toggleIsTripPriceCreating } from '../../services/helpers';
import { CONFIRM_TRIP_PRICE, GO_TO_TRIP_PRICE_SETTINGS, SET_TRIP_PRICE_MESSAGE_1} from '../../common/constants/commonСonstants';
import { handlePriceSetting } from './tripPriceControllers';
import { goToMenuKeyboard } from '../keyboards/keyboards';

const tripPriceListeners = (bot) => {
    bot.on('message', async msg => {
        const { chat: { id }, message_id } = msg;
        const shouldListenTripPrice = await getIsTripPriceSettings(id);

        if (shouldListenTripPrice) {
            await handlePriceSetting(bot, msg, id)
        }

        switch (msg.text) {
            case GO_TO_TRIP_PRICE_SETTINGS: {
                await toggleIsTripPriceCreating(msg.chat.id, true);
                bot.sendMessage(msg.chat.id, SET_TRIP_PRICE_MESSAGE_1, goToMenuKeyboard);
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
