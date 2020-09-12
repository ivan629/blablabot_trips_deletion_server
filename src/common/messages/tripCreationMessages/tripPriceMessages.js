import { LANGUAGES } from '../../constants/botSettings';

const { ua, ru, en } = LANGUAGES;

export const CONFIRM_TRIP_PRICE_MESSAGES = {
    [ua]: '✅ Підтвердити ціну',
    [ru]: '✅ подтвердить цену',
    [en]: '✅ Confirm the price',
}

export const CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES = {
    [ua]: '⛔ Підтвердити ціну',
    [ru]: '⛔ подтвердить цену',
    [en]: '⛔ Confirm the price',
}

export const SET_TRIP_PRICE_INITIAL_MESSAGES = {
    [ua]: 'Введіть ціну поїздки будь ласка 🤑',
    [ru]: 'Введите цену поизкы пожалуйста 🤑',
    [en]: 'Enter the price of the trip please 🤑',
}

export const GO_TO_TRIP_PRICE_SETTINGS_MESSAGES = {
    [ua]: '✅ Вказати ціну поїздки 💰',
    [ru]: '✅ Указать цену поездки 💰',
    [en]: '✅ Specify the price of the trip 💰',
}

export const GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED = {
    [ua]: '⛔ Вказати ціну поїздки 💰',
    [ru]: '⛔ Указать цену поездки 💰',
    [en]: '⛔ Specify the price of the trip 💰',
}

export const TRIP_PRICE_SETTINGS_FINISH_MESSAGES = {
    [ua]: 'Натисніть <b>✅ підтвердити ціну</b>',
    [ru]: 'Натисніть <b>✅ подтвердить цену</b>',
    [en]: 'Натисніть <b>✅ Confirm the price</b>',
}

export const TRIP_PRICE_SETTINGS_INITIAL_MESSAGES = {
    [ua]: 'Вказати ціну поїздки',
    [ru]: 'Вказати ціну поїздки',
    [en]: 'Вказати ціну поїздки',
}

export const TRIP_PRICE_BLOCKED_MESSAGES = {
    [ua]: '👿 Вкажіть правильну ціну!',
    [ru]: '👿 Укажите правильную цену!',
    [en]: '👿 Please enter the correct price!',
}
