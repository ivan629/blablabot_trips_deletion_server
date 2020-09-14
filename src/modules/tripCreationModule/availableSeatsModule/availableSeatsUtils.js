import { parseData, sendMessage } from '../../../common/utils/utils';
import { setAvailableSeatsDataInDB } from '../../../services/helpers';
import {
    availableSeatsKeyboard,
    availableSeatsKeyboardBlocked,
    availableSeatsCongratsKeyboard,
} from '../../keyboards/keyboards';
import { getLocalizedMessage, keysActions } from '../../../common/messages'

export const setAvailableSeatsData = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;
    const payload = parseData(data).payload;
    await setAvailableSeatsDataInDB(id, payload);

    const config = { parse_mode: 'HTML', ...availableSeatsCongratsKeyboard(query) };
    await sendMessage(bot, id, getLocalizedMessage(keysActions.CHOSEN_AVAILABLE_SEATS_MESSAGES_KEY, query)(payload), config);
};

export const sendInitialData = async (bot, msg) => {
    await sendMessage(bot, msg.chat.id, getLocalizedMessage(keysActions.AVAILABLE_SEATS_MESSAGE_KEY, msg), availableSeatsKeyboard(msg));
    await sendMessage(bot, msg.chat.id, getLocalizedMessage(keysActions.CHOOSE_AVAILABLE_SEATS_MESSAGES_KEY, msg), availableSeatsKeyboardBlocked(msg));
};

export const sendAvailableSeatsBlockedMessage = async (bot, msg) => {
    await sendMessage(bot, msg.chat.id, getLocalizedMessage(keysActions.AVAILABLE_SEATS_BLOCKED_MESSAGE_KEY, msg));
};
