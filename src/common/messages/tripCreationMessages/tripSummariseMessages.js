import { LANGUAGES } from '../../constants/botSettings';

const { ua, ru, en } = LANGUAGES;

export const TRIP_CREATION_SUMMARISE_INITIAL_MESSAGES = {
    [ua]: '🧐 Перевірте будь ласка дані про поїздку 🚌',
    [ru]: '🧐 Проверьте пожалуйста данные о поездке 🚌',
    [en]: '🧐 Please check the trip details 🚌',
}

export const TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGES = {
    [ua]: 'Якщо інформація правильна натисніть <b>💾 Зберегти поїздку</b>',
    [ru]: 'Если информация верна нажмите <b>💾 сохранить поездку</b>',
    [en]: 'If the information is correct, click <b>💾 Save the trip</b>',
}
export const FINISH_TRIP_CREATION_MESSAGES = {
    [ua]: '💾 Зберегти поїздку',
    [ru]: '💾 Сохранить поездку',
    [en]: '💾 Save the trip',
}
