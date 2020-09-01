import { USER_PAY_START } from '../../common/constants/commonСonstants';
import { makeUserPayRequest } from './userPayHelpers';

const userPayModule = bot => {
    bot.on('message', async msg => {
        switch (msg.text) {
            case USER_PAY_START: {
                makeUserPayRequest();
            }
            default: {
                break;
            }
        }
    });
};

export default userPayModule;
