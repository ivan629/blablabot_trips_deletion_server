import { LANGUAGES } from '../../constants/botSettings';
const { ua, ru, en } = LANGUAGES;

export const LANGUAGES_MESSAGES = {
    [ua]: '🇺🇦 Українська',
    [ru]: '🇷🇺 Русский',
    [en]: '🇬🇧 English',
}

export const LANGUAGES_START_SELECTION_HELP_TEXT = {
    [ua]: 'Виберыть будь ласка мову',
    [ru]: 'Выберите пожалуйста язык',
    [en]: 'Please select a language',
}

export const LANGUAGES_CHANGED_MESSAGES = {
    [ua]: 'Мову змінено!',
    [ru]: 'Язык изменено',
    [en]: 'Language changed',
}
