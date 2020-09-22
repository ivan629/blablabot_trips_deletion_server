import { sendMessage } from '../../../common/utils/utils'
import { phoneNumberKeyboard, phoneNumberKeyboardGoToSummarise} from '../../keyboards/keyboards'
import { saveCarrierPhoneNumberToDb } from '../../../services/helpers'
import { keysActions, getLocalizedMessage } from '../../../common/messages';

export const sendPhoneNumberInitialData = (bot, msg) => {
    sendMessage(bot, msg.chat.id, getLocalizedMessage(keysActions.SHARE_CARRIER_PHONE_NUMBER_MESSAGE_KEY, msg), {
        parse_mode: 'HTML',
        ...phoneNumberKeyboard(msg),
    }).then(() => {
        bot.once('contact', async (query) => {
            const { chat, contact } = query;
            await sendMessage(bot, chat.id, getLocalizedMessage(keysActions.SAVED_PHONE_NUMBER_MESSAGES_KEY, msg)(contact.phone_number), { parse_mode: 'HTML' });
            await saveCarrierPhoneNumberToDb(chat.id, contact.phone_number)
            await sendMessage(
                bot,
                chat.id,
                getLocalizedMessage(keysActions.GO_TO_TRIP_SUMMARISE_HELP_TEXT_MESSAGES_KEY, query),
                { parse_mode: 'HTML', ...phoneNumberKeyboardGoToSummarise(msg) },
                );
        })
    })
};
