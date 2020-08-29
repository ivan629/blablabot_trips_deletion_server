import { sendMessage } from '../../common/utils/utils'
import { SHARE_CARRIER_PHONE_NUMBER_MESSAGE } from '../../common/constants/commonСonstants'
import { phoneNumberKeyboard } from '../keyboards/keyboards'
import { saveCarrierPhoneNumberToDb } from '../../services/helpers'

export const sendPhoneNumberInitialData = (bot, msg) => {
    sendMessage(bot, msg.chat.id, SHARE_CARRIER_PHONE_NUMBER_MESSAGE, {
        parse_mode: 'HTML',
        ...phoneNumberKeyboard,
    }).then(() => {
        bot.once('contact', async ({ chat, contact }) => {
            await sendMessage(bot, chat.id, `Дякую! номер <b>${contact.phone_number}</b> збережено 👍`, { parse_mode: 'HTML' });
            await saveCarrierPhoneNumberToDb(chat.id, contact.phone_number)
        })
    })
};
