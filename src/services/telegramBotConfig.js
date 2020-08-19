import config from 'config';
import TelegramBot from 'node-telegram-bot-api';


const { token } = config.telegramBotConfig;

const bot = new TelegramBot(token, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10,
        }
    }
});

export default bot;
