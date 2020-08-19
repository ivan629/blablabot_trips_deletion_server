import { createAction } from '../../common/utils/utils';
import {
    GO_TO_THE_MAIN_MENU,
    FINAL_CITY_IN_THE_TRIP,
    NEXT_CITY_IN_THE_TRIP,
    GO_TO_TIME_PICKER,
} from '../../common/constants/commonСonstants';

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

export const calendarKeyboard = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
                {
                    text: GO_TO_TIME_PICKER,
                    callback_data: createAction(GO_TO_TIME_PICKER)
                }
            ],
        ]
    }
};

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
