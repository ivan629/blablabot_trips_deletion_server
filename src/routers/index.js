import { handleUserPayResponse } from '../controllers/userPayController';

const appRouters = (expressApp, bot) => {
    expressApp.get('/', (req, res) => res.send('Hello, bro!'));
    expressApp.get('/user_pay_response', (req, res) => handleUserPayResponse(req, res, bot));
};

export default appRouters;
