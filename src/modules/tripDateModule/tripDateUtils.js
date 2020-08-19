import { MONTHS } from './tripDateConstants';
import { DATE_CHANGED } from '../../common/constants/commonСonstants';
import { getCurrentStartTripDateText } from '../../services/helpers';

export const getMonthNumberByValue = value => MONTHS.findIndex(item => item === value) + 1;

export const getIsDateChangedAction = value => value.includes(DATE_CHANGED);

export const sendCurrentDateHtml = async (id, bot, calendarKeyboard) => {
    const html = await getCurrentStartTripDateText(id);
    bot.sendMessage(id, html, { parse_mode: 'HTML' });
    bot.sendMessage(id, 'Якщо дата правилна натисніть Далі', calendarKeyboard)
};
