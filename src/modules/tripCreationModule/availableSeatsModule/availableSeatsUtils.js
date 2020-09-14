import { parseData, sendMessage } from '../../../common/utils/utils';
import { setAvailableSeatsDataInDB } from '../../../services/helpers';
import {
    availableSeatsKeyboard,
    availableSeatsKeyboardBlocked,
    availableSeatsCongratsKeyboard,
} from '../../keyboards/keyboards';
import { tripCreationMessages, keysActions } from '../../../common/messages/tripCreationMessages'

export const setAvailableSeatsData = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;
    const payload = parseData(data).payload;
    await setAvailableSeatsDataInDB(id, payload);

    const config = { parse_mode: 'HTML', ...availableSeatsCongratsKeyboard(query) };
    await sendMessage(bot, id, tripCreationMessages(keysActions.CHOSEN_AVAILABLE_SEATS_MESSAGES_KEY, query)(payload), config);
};

export const sendInitialData = async (bot, msg) => {
    await sendMessage(bot, msg.chat.id, tripCreationMessages(keysActions.AVAILABLE_SEATS_MESSAGE_KEY, msg), availableSeatsKeyboard(msg));
    await sendMessage(bot, msg.chat.id, tripCreationMessages(keysActions.CHOOSE_AVAILABLE_SEATS_MESSAGES_KEY, msg), availableSeatsKeyboardBlocked(msg));
};

export const sendAvailableSeatsBlockedMessage = async (bot, msg) => {
    await sendMessage(bot, msg.chat.id, tripCreationMessages(keysActions.AVAILABLE_SEATS_BLOCKED_MESSAGE_KEY, msg));
};
