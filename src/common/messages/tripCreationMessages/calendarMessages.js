import { LANGUAGES } from '../../constants/botSettings';

const { ua, ru, en } = LANGUAGES;

export const TIME_CHOOSING_MESSAGES = {
    [ua]: 'Оберіть годину будь ласка!',
    [ru]: 'Выберите час пожалуйста!',
    [en]: 'Please select an hour!',
}

export const GO_TO_TRIP_END_TIME_PICKER_MESSAGES = {
    [ua]: '✅ Перейти до часу прибуття!',
    [ru]: '✅ На время прибытия!',
    [en]: '✅ Go to arrival time!',
}

export const BLOCKED_GO_TO_TIME_PICKER_MESSAGES = {
    [ua]: '👿 Ви не обрали дату!',
    [ru]: '👿 Вы не выбрали дату!',
    [en]: '👿 You have not selected date!',
}

export const TIME_CHOOSING_HELP_MESSAGES = {
    [ua]: 'Опісля нажиміть <b>✅ Перейти до часу прибуття!</b>',
    [ru]: 'После нажимать <b> ✅ На время прибытия!</b>',
    [en]: 'Then click <b> ✅ Go to Arrival!</b>',
}

export const TIME_STOP_CHOOSING_HELP_MESSAGES = {
    [ua]: 'Опісля нажиміть <b>✅ Вказати вільні місця!</b>',
    [ru]: 'После нажимать <b>✅ Указать свободные места!</b>',
    [en]: 'Then click <b> ✅Specify available seats!</b>',
}

export const GO_TO_TIME_PICKER_MESSAGES = {
    [ua]: '✅ Перейти до вибору години ⏰',
    [ru]: '✅ Перейти к выбору часа ⏰',
    [en]: '✅ Go to time selection ⏰',
}

export const BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGES = {
    [ua]: '⛔ Перейти до часу прибуття',
    [ru]: '⛔ Время прибытия',
    [en]: '⛔ Go to arrival time',
}

export const PROPOSE_TRIP_MESSAGES = {
    [ua]: '➕ Створити поїздку',
    [ru]: '➕ Создать поездку',
    [en]: '➕ Create trip',
}

export const FINAL_CITY_IN_THE_TRIP_MESSAGES = {
    [ua]: '✅ Це кінцеве місто у подорожі',
    [ru]: '✅ Это конечное город в путешествии',
    [en]: '✅ This is the final city in travel',
}

export const CALENDAR_START_TRIP_MESSAGES = {
    [ua]: 'Оберіть дату вашої поїздки будь ласка!',
    [ru]: 'Выберите дату вашей поездки пожалуйста!',
    [en]: 'Choose the date of your trip please!',
}

export const CALENDAR_CONGRATS_MESSAGE_START = {
    [ua]: 'Молодець! а зараз вкажи дату <b>прибуття!</b>',
    [ru]: 'Молодец! а сейчас укажи дату <b>прибытия!</b>',
    [en]: 'Well done! And now specify the date of <b>arrival!</b>',
}

export const CALENDAR_CONGRATS_MESSAGES_STOP = {
    [ua]: 'Молодець! а зараз вкажи дату <b>прибуття!</b>',
    [ru]: 'Молодец! а сейчас укажи дату <b>прибытия!</b>',
    [en]: 'Well done! and now enter the date of <b>departure!</b>',
}

export const CALENDAR_HELP_MESSAGES = {
    [ua]: 'Після натисніть <b>✅ Перейти до вибору години</b>',
    [ru]: 'После нажмите <b>✅Перейти к выбору часов</b>',
    [en]: 'Then press <b>✅ go to the time selection</b>',
}

export const BLOCKED_GO_TO_TIME_PICKER_KEYBOARD_MESSAGES = {
    [ua]: '⛔ Перейти до вибору години ⏰',
    [ru]: '⛔ Перейти к выбору часов ⏰',
    [en]: '⛔ Go to the time selection ⏰',
}
