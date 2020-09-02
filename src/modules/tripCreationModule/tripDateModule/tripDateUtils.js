import { MONTHS } from '../../../modules/tripCreationModule/tripDateModule/tripDateConstants';
import { sendMessage } from '../../../common/utils/utils';
import { getCurrentTripDateText } from '../../../services/helpers';

export const getMonthNumberByValue = value => MONTHS.findIndex(item => item === value) + 1;

export const sendCurrentDateHtml = async (id, bot, calendarKeyboard, isOnlyDate) => {
    const html = await getCurrentTripDateText(id, isOnlyDate);
    sendMessage(bot, id, html, { parse_mode: 'HTML', ...calendarKeyboard });
};