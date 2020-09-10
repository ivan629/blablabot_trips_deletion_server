import { parseData, sendMessage } from '../../../common/utils/utils';
import { setAvailableSeatsDataInDB } from '../../../services/helpers';
import {
    AVAILABLE_SEATS_MESSAGE,
    CHOOSE_AVAILABLE_SEATS_MESSAGE,
    AVAILABLE_SEATS_BLOCKED_MESSAGE
} from '../../../common/constants/commonСonstants';
import {
    availableSeatsKeyboard,
    availableSeatsKeyboardBlocked,
    availableSeatsCongratsKeyboard,
} from '../../keyboards/keyboards';

import { availableSeatsMessages } from '../../../common/messages/index';

export const setAvailableSeatsData = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;
    const payload = parseData(data).payload;
    await setAvailableSeatsDataInDB(id, payload);

    const config = { parse_mode: 'HTML', ...availableSeatsCongratsKeyboard };
    await sendMessage(bot, id, availableSeatsMessages.getSettAvailableSeatsDataMessage(payload), config);
};

export const sendInitialData = async (bot, msg) => {
    await sendMessage(bot, msg.chat.id, AVAILABLE_SEATS_MESSAGE, availableSeatsKeyboard);
    await sendMessage(bot, msg.chat.id, CHOOSE_AVAILABLE_SEATS_MESSAGE, availableSeatsKeyboardBlocked);
};

export const sendAvailableSeatsBlockedMessage = async (bot, msg) => {
    await sendMessage(bot, msg.chat.id, AVAILABLE_SEATS_BLOCKED_MESSAGE);
};
