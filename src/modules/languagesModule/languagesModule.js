import { parseData } from '../../common/utils/utils';
import { showLanguagesPanel, handleChangeLanguage } from './languagesUtils';
import { keysActions, getLocalizedMessage } from '../../common/messages';

const languagesModule = bot => {
    bot.on('callback_query', async query => {
        const data = parseData(query.data);

        switch (data.type) {
            case getLocalizedMessage(keysActions.LANGUAGES_ACTION_TYPE, query): {
                await handleChangeLanguage(bot, query);
            }
                break;
            default: {
                break;
            }
        }
    });
    
    bot.on('message', async msg => {
        switch (msg.text) {
            case getLocalizedMessage(keysActions.LANGUAGES_KEY, msg): {
                await showLanguagesPanel(bot, msg);
            }
            default: {
                break;
            }
        }
    });
};

export default languagesModule;
