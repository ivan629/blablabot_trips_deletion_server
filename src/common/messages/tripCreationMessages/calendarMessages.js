import { LANGUAGES } from '../../constants/botSettings';

const { uk, ru, en } = LANGUAGES;

export const TIME_CHOOSING_MESSAGES = {
    [uk]: 'Оберіть годину будь ласка!',
    [ru]: 'Выберите час пожалуйста!',
    [en]: 'Please select an hour!',
};

export const GO_TO_TRIP_END_TIME_PICKER_MESSAGES = {
    [uk]: '✅ Перейти до часу прибуття!',
    [ru]: '✅ На время прибытия!',
    [en]: '✅ Go to arrival time!',
};

export const BLOCKED_GO_TO_TIME_PICKER_MESSAGES = {
    [uk]: '👿 Ви не обрали дату!',
    [ru]: '👿 Вы не выбрали дату!',
    [en]: '👿 You have not selected date!',
};

export const TIME_CHOOSING_HELP_MESSAGES = {
    [uk]: 'Опісля нажиміть <b>✅ Перейти до часу прибуття!</b>',
    [ru]: 'После нажимать <b> ✅ На время прибытия!</b>',
    [en]: 'Then click <b> ✅ Go to Arrival!</b>',
};

export const TIME_STOP_CHOOSING_HELP_MESSAGES = {
    [uk]: 'Опісля нажиміть <b>✅ Вказати вільні місця!</b>',
    [ru]: 'После нажимать <b>✅ Указать свободные места!</b>',
    [en]: 'Then click <b> ✅ Specify available seats!</b>',
};

export const GO_TO_TIME_PICKER_MESSAGES = {
    [uk]: '✅ Перейти до вибору години ⏰',
    [ru]: '✅ Перейти к выбору часа ⏰',
    [en]: '✅ Go to the time selection ⏰',
};

export const BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGES = {
    [uk]: '⛔ Перейти до часу прибуття',
    [ru]: '⛔ Время прибытия',
    [en]: '⛔ Go to arrival time',
};

export const PROPOSE_TRIP_MESSAGES = {
    [uk]: '➕ Створити поїздку',
    [ru]: '➕ Создать поездку',
    [en]: '➕ Create trip',
};

export const CALENDAR_START_TRIP_MESSAGES = {
    [uk]: 'Оберіть дату вашої поїздки будь ласка!',
    [ru]: 'Выберите дату вашей поездки пожалуйста!',
    [en]: 'Choose the date of your trip please!',
};

export const CALENDAR_CONGRATS_MESSAGE_START = {
    [uk]: 'Молодець! а зараз вкажи дату <b>прибуття!</b>',
    [ru]: 'Молодец! а сейчас укажи дату <b>прибытия!</b>',
    [en]: 'Well done! And now specify the date of <b>arrival!</b>',
};

export const CALENDAR_CONGRATS_MESSAGES_STOP = {
    [uk]: 'Молодець! а зараз вкажи дату <b>прибуття!</b>',
    [ru]: 'Молодец! а сейчас укажи дату <b>прибытия!</b>',
    [en]: 'Well done! and now enter the date of <b>departure!</b>',
};

export const CALENDAR_HELP_MESSAGES = {
    [uk]: 'Після натисніть <b>✅ Перейти до вибору години</b>',
    [ru]: 'После нажмите <b>✅Перейти к выбору часов</b>',
    [en]: 'Then press <b>✅ go to the time selection</b>',
};

export const BLOCKED_GO_TO_TIME_PICKER_KEYBOARD_MESSAGES = {
    [uk]: '⛔ Перейти до вибору години ⏰',
    [ru]: '⛔ Перейти к выбору часа ⏰',
    [en]: '⛔ Go to the time selection ⏰',
};
