import { head } from 'lodash';
import { parseData } from '../../../common/utils/utils';
import { updateFieldInUserDoc } from '../../../services/helpers';
import { calendarKeyboard } from '../../../modules/keyboards/keyboards';
import { getMonthNumberByValue, sendCurrentDateHtml } from './findTripDateUtils';
import CalendarComponent from './findTripCalendarComponent';
import { FIND_TRIP_SEARCH_TRIPS } from '../../../common/constants/commonСonstants';

const calendarComponent = new CalendarComponent();

const setFindDatePickerDataToDb = async (chat_id, field, data) => {
    await updateFieldInUserDoc(chat_id, `find_trip.date.${field}`, data);
};

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

    const calendar = await calendarComponent.getCalendar({ customMonthNumber, newYear, shouldDisableGoToNextMonthButton, chat_id: chat.id });

    await bot.editMessageReplyMarkup(calendar, {chat_id: chat.id, message_id},);
};

export const userFindTripChangedDate = async (query, bot) => {
    const { message, data } = query;
    const { chat, reply_markup, trip_creation_date, message_id } = message;

    const { id: chat_id } = chat;
    const [monthText, start_date_year] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    const start_date_month = getMonthNumberByValue(monthText);
    const { payload: start_date_day } = parseData(data);

    const [month, year] = head(reply_markup.inline_keyboard)[0].text.split(' ');
    const newYear = +year;

    let shouldDisableGoToNextMonthButton = false;
    const currentYear = new Date().getFullYear();
    if (currentYear !== newYear) shouldDisableGoToNextMonthButton = true;

    const calendar = await calendarComponent.getCalendar({
        newYear,
        customMonthNumber: +start_date_month,
        shouldDisableGoToNextMonthButton,
        chat_id: chat.id,
        chosenDay: start_date_day
    });

    await bot.editMessageReplyMarkup(calendar, {chat_id: chat.id, message_id});
    const alReqs = [
        await setFindDatePickerDataToDb(chat_id, 'day', start_date_day),
        await setFindDatePickerDataToDb(chat_id, 'month', start_date_month),
        await setFindDatePickerDataToDb(chat_id, 'year', start_date_year),
     ];

    await Promise.all(alReqs);
    await sendCurrentDateHtml(chat_id, bot, calendarKeyboard(FIND_TRIP_SEARCH_TRIPS));
};
