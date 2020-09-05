import { head } from 'lodash';
import { parseData } from '../../../common/utils/utils';
import { saveNewFindTripDateToDb } from '../findTripsUtils';
import { calendarKeyboard } from '../../../modules/keyboards/keyboards';
import { getMonthNumberByValue, sendCurrentDateHtml } from './findTripDateUtils';
import findTripCalendarComponent from './findTripCalendarComponent';
import { FIND_TRIP_SEARCH_TRIPS } from '../../../common/constants/commonСonstants';


export const changeFindTripCalendarMonth = async (query, bot, isUp) => {
    const {chat, reply_markup, message_id} = query.message;
    const [oldMonth, oldYear] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    let newYear;
    const oldMonthNumber = getMonthNumberByValue(oldMonth);
    let customMonthNumber = isUp ? oldMonthNumber + 1 : oldMonthNumber - 1;

    // TODO: we don't allow to choose more then 1 month in next year for now, because need to save ald year in DB
    let shouldDisableGoToNextMonthButton = false;

    if (customMonthNumber > 12) {
        customMonthNumber = 1;
        newYear = +oldYear + 1;
        shouldDisableGoToNextMonthButton = true;
    } else if (customMonthNumber < 1) {
        customMonthNumber = 12;
        newYear = +oldYear - 1;
    }

    const calendar = await findTripCalendarComponent({
        newYear,
        chat_id: chat.id,
        customMonthNumber,
        shouldDisableGoToNextMonthButton,
    });

    await bot.editMessageReplyMarkup(calendar, {chat_id: chat.id, message_id},);
};

export const userFindTripChangedDate = async (query, bot) => {
    const { message, data } = query;
    const { chat, reply_markup, message_id } = message;

    const { id: chat_id } = chat;
    const [monthText, start_date_year] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    const start_date_month = getMonthNumberByValue(monthText);
    const { payload: start_date_day } = parseData(data);

    const [month, year] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    const newYear = +year;

    let shouldDisableGoToNextMonthButton = false;
    const currentYear = new Date().getFullYear();
    if (currentYear !== newYear) shouldDisableGoToNextMonthButton = true;

    const calendar = await findTripCalendarComponent({
        newYear,
        customMonthNumber: +start_date_month,
        shouldDisableGoToNextMonthButton,
        chat_id: chat.id,
        alreadyChosenDay: start_date_day
    });

    await bot.editMessageReplyMarkup(calendar, {chat_id: chat.id, message_id});
    await saveNewFindTripDateToDb(chat.id, start_date_day, start_date_month, start_date_year);
    await sendCurrentDateHtml(chat_id, bot, calendarKeyboard(FIND_TRIP_SEARCH_TRIPS));
};
