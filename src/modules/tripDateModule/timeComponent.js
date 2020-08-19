import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import { TIME_PICKER_MINUTES } from './tripDateConstants';
import { SET_TRIP_HOUR, SET_TRIP_MINUTES } from '../../common/constants/commonСonstants';

export const timeComponent = () => {
    const hours = new Array(24).fill(null).reduce((result, item, index) => {
        result.push({
            text: `${index + 1}`,
            callback_data: createAction(SET_TRIP_HOUR, index + 1)
        });

        return result;
    }, []);

    const minutes = TIME_PICKER_MINUTES.reduce((result, item) => {
        result.push({
            text: `${item} хв`,
            callback_data: createAction(SET_TRIP_MINUTES, item)
        });

        return result;
    }, []);

    return {
        reply_markup: {
            inline_keyboard: [
                ...chunk(hours, 8),
                minutes,
            ]
        }
    }
};

export default timeComponent;
