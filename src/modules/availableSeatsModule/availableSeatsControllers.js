import { parseData, sendMessage } from '../../common/utils/utils';
import { setAvailableSeatsDataInDB } from '../../services/helpers';
import { AVAILABLE_SEATS_CONGRATS_MESSAGE, AVAILABLE_SEATS_MESSAGE_1 } from '../../common/constants/commonСonstants';
import { availableSeatsCongratsKeyboard } from '../keyboards/keyboards';

export const setAvailableSeatsData = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;

    const payload = parseData(data).payload;
    await setAvailableSeatsDataInDB(id, payload);
    sendMessage(bot, id, AVAILABLE_SEATS_MESSAGE_1 + ` <b>${payload}</b> ` + 'вільних місць', { parse_mode: 'HTML' });
    sendMessage(bot, id, AVAILABLE_SEATS_CONGRATS_MESSAGE, availableSeatsCongratsKeyboard)
};
