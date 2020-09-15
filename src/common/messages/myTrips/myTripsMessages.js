import { LANGUAGES } from '../../constants/botSettings';

const { ua, ru, en } = LANGUAGES;

export const SHOW_I_AM_DRIVING_MESSAGES = {
    [ua]: '😎 Я везу',
    [ru]: '😎 Я везу',
    [en]: '😎 I\'m driving',
}

export const SHOW_BOOKED_TRIPS_MESSAGES = {
    [ua]: '🎫 Заброньовані',
    [ru]: '🎫 забронированы',
    [en]: '🎫 Reserved',
}

export const BOOK_TRIPS_MESSAGES = {
    [ua]: '🎫 Заброньовати',
    [ru]: '🎫 Забронировать',
    [en]: '🎫 Book',
}

export const NOT_FOUND_TRIPS_MESSAGES = {
    [ua]: `😭 нажаль ми не знайшли поїздок\n🤔 спробуйте іншу дату`,
    [ru]: `😭 к сожалению мы не нашли поездок\n🤔 попробуйте другую дату`,
    [en]: `😭 unfortunately we did not find any trips\n🤔 try another date`,
}

export const MY_TRIPS_CHOOSE_ROLE_MESSAGE = {
    [ua]: 'Виберіть ролль 💡',
    [ru]: 'Выберите Ролль 💡',
    [en]: 'Select a roll 💡',
}

export const UNBOOK_TRIP_MESSAGES = {
    [ua]: '❌ Скасувати бронювання',
    [ru]: '❌ Отменить бронирование',
    [en]: '❌ Cancel the reservation',
}

export const NOT_FOUND_CARRIER_TRIPS_MESSAGES = {
    [ua]: 'У вас немає поїздок 🤷',
    [ru]: 'В вас нет поездок 🤷',
    [en]: 'You don\'t have trips 🤷',
}

export const TRIP_LIST_CAPTION_MESSAGES = {
    [ua]: '🔸🔸🔸️️Створені поїздки!🔹🔹🔹',
    [ru]: '🔸🔸🔸️️Созданные поездки!🔹🔹🔹',
    [en]: '🔸🔸🔸️️Created trips!🔹🔹🔹',
}

export const REMOVE_TRIP_BUTTON_MESSAGES = {
    [ua]: 'Видалити 🗑️',
    [ru]: 'Удалить 🗑️',
    [en]: 'Remove 🗑️',
}

export const BOOKED_TRIP_LIST_CAPTION_MESSAGES = {
    [ua]: '🔸🔸🔸Заброньовані поїздки!🔹🔹🔹',
    [ru]: '🔸🔸🔸забронированы поездки🔹🔹🔹',
    [en]: '🔸🔸🔸Booked trips!🔹🔹🔹',
}
