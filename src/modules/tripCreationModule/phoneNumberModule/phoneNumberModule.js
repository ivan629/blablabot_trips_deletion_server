import { sendPhoneNumberInitialData } from './phoneNumberHelpers';
import phoneNumberListeners from '../../../modules/tripCreationModule/phoneNumberModule/phoneNumberListeners';

class phoneNumberModule {
    async runPhoneNumberModule(bot, msg) {
        sendPhoneNumberInitialData(bot, msg);
    }

    setListeners(bot) {
        phoneNumberListeners(bot);
    }
}

export default phoneNumberModule;
