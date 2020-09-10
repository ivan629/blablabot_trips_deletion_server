import { LANGUAGES } from '../../constants/botSettings';

const { ua, ru, en } = LANGUAGES;

export const CITIES_INITIAL_HELP_TEXT_MESSAGES = {
    [ua]: 'Напишіть місто відправлення, наприклад <b>Київ</b> 🏙️',
    [ru]: 'Напишите город отправления, например <b>Киев</b> 🏙️',
    [en]: 'Write city of departure, for example <b>Kiev</b> 🏙️',
}

export const SHOW_NEXT_CITY_MESSAGES = {
    [ua]: '⬇️ Показати наступну локацію',
    [ru]: '⬇️ Показать следующую локацию',
    [en]: '⬇️ Show next location',
}

export const CHOOSE_TRIP_CITY_MESSAGES = {
    [ua]: '➕ Додати',
    [ru]:  '➕ Добавить',
    [en]:  '➕ Add',
}

export const NOT_FOUND_CITY_MESSAGES = {
    [ua]: 'Нажаль ми не знайшли такого міста 😕',
    [ru]: 'К сожалению мы не нашли такого города 😕',
    [en]: 'Unfortunately, we did not find such a city 😕',
}

export const CITIES_ADD_NEW_HELP_TEXT_MESSAGES = {
    [ua]: '😎 Чудово! Додайте наступне місто у подорожі 🚃',
    [ru]: '😎 Прекрасно! Добавьте следующий город в путешествии 🚃',
    [en]: '😎 Perfectly! Add the next city to your trip 🚃',
}

export const BLOCKED_FINAL_CITY_MESSAGES = {
    [ua]: '👿 Додайте щонайменше 2 міста в поїздку.',
    [ru]: '👿 Добавьте менее 2 города в поездку.',
    [en]: '👿 Add at least 2 cities to the trip.',
}
export const CITY_ALREADY_EXISTS_ERROR_MESSAGES = {
    [ua]: '👿 Це місто вже додане у подорож!',
    [ru]: '👿 Этот город уже добавлено в путешествие!',
    [en]: '👿 This city has already been added to the trip!',
}
