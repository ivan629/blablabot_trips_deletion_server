import { SET_AVAILABLE_SEATS_CUNT } from '../../common/constants/commonСonstants';
import { setAvailableSeatsData } from './availableSeatsControllers';

const AvailableSeatsListeners = bot => {
    bot.on('callback_query', query => {
        const data = JSON.parse(query.data);

        switch (data.type) {
            case SET_AVAILABLE_SEATS_CUNT: {
                setAvailableSeatsData(bot, query);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default AvailableSeatsListeners;
