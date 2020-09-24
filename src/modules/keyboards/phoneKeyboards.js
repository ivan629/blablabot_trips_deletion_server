import {
    GO_TO_THE_MAIN_MENU,
    GO_TO_TRIP_SUMMARISE,
    SEND_MY_PHONE_NUMBER,
} from '../../common/constants/commonСonstants';
import { createAction } from '../../common/utils/utils';

export const phoneNumberKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: SEND_MY_PHONE_NUMBER,
                    request_contact: true,
                },
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU),
                },
            ],
        ],
    },
};

export const phoneNumberKeyboardGoToSummarise = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: GO_TO_TRIP_SUMMARISE }],
            [{ text: GO_TO_THE_MAIN_MENU }],
        ],
    },
};
