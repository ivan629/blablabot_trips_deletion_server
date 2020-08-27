import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import {
    FIND_TRIP,
    PROPOSE_TRIP,
    CONFIRM_TRIP_PRICE,
    GO_TO_THE_MAIN_MENU,
    FINISH_TRIP_CREATION,
    FINAL_CITY_IN_THE_TRIP,
    NEXT_CITY_IN_THE_TRIP,
    SET_AVAILABLE_SEATS_CUNT,
    GO_TO_TRIP_PRICE_SETTINGS,
} from '../../common/constants/commonСonstants';

export const tripPriceSettingsKeyboardInitial = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ]
        ]
    }
};

export const tripPriceSettingsKeyboardFinish = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
                {
                    text: CONFIRM_TRIP_PRICE,
                    callback_data: createAction(CONFIRM_TRIP_PRICE)
                }
            ]
        ]
    }
};

export const availableSeatsKeyboard = {
    reply_markup: {
        inline_keyboard: chunk(new Array(30).fill(null).reduce((result, item, index) => {
            result.push({
                text: index + 1,
                callback_data: createAction(SET_AVAILABLE_SEATS_CUNT, index + 1),
            });

            return result;
        }, []), 6)
    }
};

export const tripSummaryKeyboards = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
                {
                    text: FINISH_TRIP_CREATION,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                }
            ]
        ]
    }
};

export const availableSeatsCongratsKeyboard = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
                {
                    text: GO_TO_TRIP_PRICE_SETTINGS,
                    callback_data: createAction(GO_TO_TRIP_PRICE_SETTINGS)
                }
            ]
        ]
    }
};

export const initialKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: FIND_TRIP,
                    callback_data: createAction(FIND_TRIP),
                },
                {
                    text: PROPOSE_TRIP,
                    callback_data: createAction(PROPOSE_TRIP)
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

export const goToMenuKeyboard = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
            ],
        ]
    }
};

export const calendarNotCompletedKeyboard = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
            ],
        ]
    }
};

export const creatingCitiesKeyboards = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
                {
                    text: FINAL_CITY_IN_THE_TRIP,
                    callback_data: createAction(FINAL_CITY_IN_THE_TRIP)
                }
            ],
        ]
    }
};
