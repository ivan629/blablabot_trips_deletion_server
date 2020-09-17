export const handleBotRequest = (ctx, bot) => {
    const { body } = ctx;
    bot.processUpdate(body)
};