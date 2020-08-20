import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import {
    GO_TO_THE_MAIN_MENU,
    FINAL_CITY_IN_THE_TRIP,
    NEXT_CITY_IN_THE_TRIP,
    SET_AVAILABLE_SEATS_CUNT
} from '../../common/constants/commonСonstants';

export const availableSeatsKeyboard = {
    reply_markup: {
        inline_keyboard: chunk(new Array(30).fill(null).reduce((result, item, index) => {
            result.push({
                text: index + 1,
                callback_data: createAction(SET_AVAILABLE_SEATS_CUNT, index + 1),
            });

            return result;
        }, []), 10)
    }
};

export const initialKeyboard = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: 'Знайти поїздку',
                    callback_data: createAction('find_car'),
                },
                {
                    text: 'Запропонувати поїздку',
                    callback_data: createAction('PROPOSE_TRIP')
                }
            ]
        ]
    }
};

export const calendarKeyboard = nextButtonAction => ({
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
                {
                    text: nextButtonAction,
                    callback_data: createAction(nextButtonAction)
                }
            ],
        ]
    }
});

export const creatingCitiesKeyboards = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: NEXT_CITY_IN_THE_TRIP,
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
                {
                    text: FINAL_CITY_IN_THE_TRIP,
                    callback_data: createAction(FINAL_CITY_IN_THE_TRIP)
                }
            ],
            [{
                text: GO_TO_THE_MAIN_MENU,
                callback_data: createAction(GO_TO_THE_MAIN_MENU),
            }]
        ]
    }
};
