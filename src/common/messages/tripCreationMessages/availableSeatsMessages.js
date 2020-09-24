import { LANGUAGES } from '../../constants/botSettings';

const { uk, ru, en } = LANGUAGES;

export const BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_MESSAGES = {
    [uk]: '⛔ Вказати вільні місця 💺️',
    [ru]: '⛔ Указать свободные места 💺️',
    [en]: '⛔ Specify available seats 💺️',
};

export const BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES = {
    [uk]: '👿 Ви не вказали годину прибуття!',
    [ru]: '👿 Вы не указали время прибытия!',
    [en]: '👿 You did not specify an arrival time!',
};

export const GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES = {
    [uk]: '✅ Вказати вільні місця 💺',
    [ru]: '✅ Указать свободные места 💺',
    [en]: '✅ Specify available seats 💺',
};

export const AVAILABLE_SEATS_MESSAGE = {
    [uk]: 'Панель вибору місць 🧐',
    [ru]: 'Панель выбора мест 🧐',
    [en]: 'Places selection panel 🧐',
};

export const AVAILABLE_SEATS_BLOCKED_MESSAGES = {
    [uk]: '👿 Ви не обрали кількість вільних місць!',
    [ru]: '👿 Вы не выбрали количество свободных мест!',
    [en]: '👿 You have not selected a number of vacancies!',
};

export const CHOOSE_AVAILABLE_SEATS_MESSAGES = {
    [uk]: 'Виберіть кількість вільних місць 🤗',
    [ru]: 'Выберите количество свободных мест 🤗',
    [en]: 'Select the number of available seats 🤗',
};

export const CHOSEN_AVAILABLE_SEATS_MESSAGES = {
    [uk]: (seatsCount) =>
        `Ви обрали <b>${seatsCount}</b> ` +
        `${seatsCount > 1 ? 'вільних місць 💺' : 'вільне місце 💺'}`,
    [ru]: (seatsCount) =>
        `Вы выбрали <b>${seatsCount}</b> ` +
        `${seatsCount > 1 ? 'свободных мест 💺' : 'свободное место 💺'}`,
    [en]: (seatsCount) =>
        `You have chosen <b>${seatsCount}</b> ` +
        `${seatsCount > 1 ? 'free seats 💺' : 'free seat 💺'}`,
};
