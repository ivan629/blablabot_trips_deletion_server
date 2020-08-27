import { MONTHS } from './tripDateConstants';
import { DATE_CHANGED } from '../../common/constants/commonСonstants';
import { sendMessage } from '../../common/utils/utils';
import { getCurrentTripDateText } from '../../services/helpers';

export const getMonthNumberByValue = value => MONTHS.findIndex(item => item === value) + 1;

export const getIsDateChangedAction = value => value.includes(DATE_CHANGED);

export const sendCurrentDateHtml = async (id, bot, calendarKeyboard) => {
    const html = await getCurrentTripDateText(id);
    sendMessage(bot, id, html, { parse_mode: 'HTML', ...calendarKeyboard });
};
