import config from 'config';
import TelegramBot from 'node-telegram-bot-api';

const { token, isWebhooksActive, webhooksServerUrl } = config.telegramBotConfig;

let bot;

if (isWebhooksActive) {
    bot = new TelegramBot(token);
    bot.setWebHook(`${webhooksServerUrl}/bot`);
} else {
    bot = new TelegramBot(token, {
        polling: {
            interval: 300,
            autoStart: true,
            params: {
                timeout: 10,
            },
        },
    });
}

export default bot;
