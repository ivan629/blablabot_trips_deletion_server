import { parseData, sendMessage } from '../../common/utils/utils';
import { setAvailableSeatsDataInDB } from '../../services/helpers';
import {
    AVAILABLE_SEATS_CONGRATS_MESSAGE,
    AVAILABLE_SEATS_MESSAGE,
    AVAILABLE_SEATS_MESSAGE_1,
    AVAILABLE_SEATS_MESSAGE_2,
    AVAILABLE_SEATS_BLOCKED_MESSAGE
} from '../../common/constants/commonСonstants';
import {
    availableSeatsKeyboard,
    availableSeatsKeyboardBlocked,
    availableSeatsCongratsKeyboard,
} from '../keyboards/keyboards';

export const setAvailableSeatsData = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;

    const payload = parseData(data).payload;
    await setAvailableSeatsDataInDB(id, payload);
    sendMessage(bot, id, AVAILABLE_SEATS_MESSAGE_1 + ` <b>${payload}</b> ` + 'вільних місць', { parse_mode: 'HTML' });
    sendMessage(bot, id, AVAILABLE_SEATS_CONGRATS_MESSAGE,  { parse_mode: 'HTML', ...availableSeatsCongratsKeyboard })
};

export const sendInitialData = async (bot, msg) => {
    const { id } = msg.chat;
    await sendMessage(bot, id, AVAILABLE_SEATS_MESSAGE, availableSeatsKeyboard);
    sendMessage(bot, id, AVAILABLE_SEATS_MESSAGE_2, availableSeatsKeyboardBlocked);
};

export const sendAvailableSeatsBlockedMessage = async (bot, msg) => {
    const { id } = msg.chat;
    sendMessage(bot, id, AVAILABLE_SEATS_BLOCKED_MESSAGE);
};
