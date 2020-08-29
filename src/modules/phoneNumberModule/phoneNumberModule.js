import phoneNumberListeners  from './phoneNumberListeners';
import { sendPhoneNumberInitialData }  from './phoneNumberHelpers';


class phoneNumberModule {
    async runPhoneNumberModule(bot, msg) {
        sendPhoneNumberInitialData(bot, msg);
    }

    setListeners(bot) {
        phoneNumberListeners(bot)
    }
}

export default phoneNumberModule;
