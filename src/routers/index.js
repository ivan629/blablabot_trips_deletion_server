import { handleUserPayResponse } from '../controllers/userPayController';
import { handleBotRequest } from '../controllers/botRequests';

const appRouters = (expressApp, bot) => {
    expressApp.get('/', (req, res) => res.send('Hello, bro!'));
    expressApp.get('/user_pay_response', (req, res) =>
        handleUserPayResponse(req, res, bot)
    );
    expressApp.post('/bot', (ctx) => handleBotRequest(ctx, bot));
};

export default appRouters;
