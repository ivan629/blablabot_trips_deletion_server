import { LANGUAGES } from '../../constants/botSettings';

const { uk, ru, en } = LANGUAGES;

export const SHARE_CARRIER_PHONE_NUMBER_MESSAGES = {
    [uk]: 'Продовжити натісніть ☎️ <b>Надіслати мій номер телефону</b>',
    [ru]: 'Продолжить нажмите ☎️ <b>Отправить мой номер телефона</b>',
    [en]: 'Continue to click ☎️ <b>Send my phone number</b>',
}

export const GO_TO_TRIP_SUMMARISE_MESSAGES = {
    [uk]: '🧐 Перевірити інформацію',
    [ru]: '🧐 Проверить информацию',
    [en]: '🧐 Check the information',
}

export const GO_TO_TRIP_SUMMARISE_HELP_TEXT_MESSAGES = {
    [uk]: 'Продовжити натісніть <b>🧐 Перевірити інформацію</b>',
    [ru]: 'Продолжить нажмите <b>🧐 Проверить информацию</b>',
    [en]: 'Continue to click <b>🧐 Check the information</b>',
}

export const SEND_MY_PHONE_NUMBER_MESSAGES = {
    [uk]: '☎️ Надіслати мій номер телефону',
    [ru]: '☎️ Отправить мой номер телефона',
    [en]: '☎️ Send my phone number',
}

export const SAVED_PHONE_NUMBER_MESSAGES = {
    [uk]: phoneNumber => `Дякую! номер <b>${phoneNumber}</b> збережено 👍`,
    [ru]: phoneNumber => `Спасибо! номер <b>${phoneNumber}</b> сохранено 👍`,
    [en]: phoneNumber => `Thank you! номер <b>${phoneNumber}</b> saved 👍`,
}
