import { LANGUAGES } from '../../constants/botSettings';

const { uk, ru, en } = LANGUAGES;

export const FINAL_CITY_IN_THE_TRIP_MESSAGES = {
    [uk]: '✅ Це кінцеве місто у подорожі',
    [ru]: '✅ Это конечное город в путешествии',
    [en]: '✅ This is the final city in travel',
};

export const SHOW_NEXT_CITY_MESSAGES = {
    [uk]: '⬇️ Показати наступну локацію',
    [ru]: '⬇️ Показать следующую локацию',
    [en]: '⬇️ Show next location',
};

export const CHOOSE_TRIP_CITY_MESSAGES = {
    [uk]: '➕ Додати',
    [ru]: '➕ Добавить',
    [en]: '➕ Add',
};

export const NOT_FOUND_CITY_MESSAGES = {
    [uk]: 'Нажаль ми не знайшли такого міста 😕',
    [ru]: 'К сожалению мы не нашли такого города 😕',
    [en]: 'Unfortunately, we did not find such a city 😕',
};

export const CITIES_ADD_NEW_HELP_TEXT_MESSAGES = {
    [uk]: '😎 Чудово! Додайте наступне місто у подорожі 🚃',
    [ru]: '😎 Прекрасно! Добавьте следующий город в путешествии 🚃',
    [en]: '😎 Perfectly! Add the next city to your trip 🚃',
};

export const BLOCKED_FINAL_CITY_MESSAGES = {
    [uk]: '👿 Додайте щонайменше 2 міста в поїздку.',
    [ru]: '👿 Добавьте менее 2 города в поездку.',
    [en]: '👿 Add at least 2 cities to the trip.',
};
export const CITY_ALREADY_EXISTS_ERROR_MESSAGES = {
    [uk]: '👿 Це місто вже додане у подорож!',
    [ru]: '👿 Этот город уже добавлено в путешествие!',
    [en]: '👿 This city has already been added to the trip!',
};

export const BLOCKED_FINAL_CITY_IN_THE_TRIP_MESSAGES = {
    [uk]: '⛔ Це кінцеве місто у подорожі',
    [ru]: '⛔ Это конечный город в путешествии',
    [en]: '⛔ This is the ultimate city to travel',
};
