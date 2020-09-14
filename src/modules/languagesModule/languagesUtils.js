import { parseData, sendMessage } from '../../common/utils/utils';
import { keysActions, getLocalizedMessage } from '../../common/messages';
import { languagesKeyboard } from '../keyboards/keyboards';
import { setLanguageToDb } from '../../services/helpers';

export const showLanguagesPanel = async (bot, msg) => {
    const chatId = msg.chat.id;
    await sendMessage(bot, chatId, getLocalizedMessage(keysActions.LANGUAGES_START_SELECTION_HELP_TEXT_KEY), languagesKeyboard(msg))
};

export const handleChangeLanguage = async (bot, query) => {
    const { message: { chat: { id: chatId }}, data } = query;
    const { payload: newLanguage } = parseData(data);
    await setLanguageToDb(chatId, newLanguage);
    await sendMessage(bot, chatId, getLocalizedMessage(keysActions.LANGUAGES_CHANGED_MESSAGES_KEY, query))
};