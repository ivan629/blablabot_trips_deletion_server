import phoneNumberListeners  from '../../../modules/tripCreationModule/phoneNumberModule/phoneNumberListeners';
import { sendPhoneNumberInitialData }  from '../../../modules/tripCreationModule/phoneNumberModule/phoneNumberHelpers';


class phoneNumberModule {
    async runPhoneNumberModule(bot, msg) {
        sendPhoneNumberInitialData(bot, msg);
    }

    setListeners(bot) {
        phoneNumberListeners(bot)
    }
}

export default phoneNumberModule;
