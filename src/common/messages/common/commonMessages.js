import { LANGUAGES } from '../../constants/botSettings';

const { ua, ru, en } = LANGUAGES;

export const FIND_TRIPS_KEYBOARDS_DAY_MESSAGES = {
    [ua]: ['🚀 сьогодні', '🤭 завтра', '😴 післязавтра', '📅 календар'],
    [ru]: ['🚀 сегодня', '🤭 завтра', '😴 послезавтра', '📅 календарь'],
    [en]: ['🚀 today', '🤭 tomorrow', '😴 after tomorrow', '📅 calendar'],
}

export const CALENDAR_MONTHS_MESSAGES = {
    [ua]: ['январь', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    [ru]: ['Январь', 'Февраль', 'Март', 'Квітень', 'Апрель', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    [en]: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export const CALENDAR_WEEK_DAYS_MESSAGES = {
    [ua]: [
        { text: 'Пн', callback_data: 'none' },
        { text: 'Вт', callback_data: 'none' },
        { text: 'Ср', callback_data: 'none' },
        { text: 'Чт', callback_data: 'none' },
        { text: 'Пт', callback_data: 'none' },
        { text: 'Сб', callback_data: 'none' },
        { text: 'Нд', callback_data: 'none' },
    ],
    [ru]: [
        { text: 'Пн', callback_data: 'none' },
        { text: 'Вт', callback_data: 'none' },
        { text: 'Ср', callback_data: 'none' },
        { text: 'Чт', callback_data: 'none' },
        { text: 'Пт', callback_data: 'none' },
        { text: 'Сб', callback_data: 'none' },
        { text: 'Вс', callback_data: 'none' },
    ],
    [en]: [
        {text: 'Mon', callback_data: 'none'},
        {text: 'Tue', callback_data: 'none'},
        {text: 'Wed', callback_data: 'none'},
        {text: 'Thu', callback_data: 'none'},
        {text: 'Fri', callback_data: 'none'},
        {text: 'Sun', callback_data: 'none'},
        {text: 'Sat', callback_data: 'none'},
    ],
};
