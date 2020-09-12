import { chunk } from 'lodash';
import {
    GO_TO_THE_MAIN_MENU,
    GO_TO_TRIP_SUMMARISE,
    SEND_MY_PHONE_NUMBER,
    FINISH_TRIP_CREATION,
} from '../../common/constants/commonСonstants';
import { createAction } from '../../common/utils/utils';
import { SET_AVAILABLE_SEATS_CUNT } from '../../common/messages/tripCreationMessages/availableSeatsKeysActions';
import {keysActions, tripCreationMessages} from '../../common/messages/tripCreationMessages';

export const phoneNumberKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: SEND_MY_PHONE_NUMBER, request_contact: true }],
            [{ text: GO_TO_THE_MAIN_MENU }]
        ]
    }
};

export const phoneNumberKeyboardGoToSummarise = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: GO_TO_TRIP_SUMMARISE }],
            [{ text: GO_TO_THE_MAIN_MENU }]
        ]
    }
};

export const tripPriceSettingsKeyboardInitial = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: tripCreationMessages(keysActions.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }]
        ]
    }
};

export const tripPriceSettingsKeyboardFinish = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: tripCreationMessages(keysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }]
        ]
    }
};

export const availableSeatsKeyboard = {
    reply_markup: {
        inline_keyboard: chunk(new Array(8).fill(null).reduce((result, item, index) => {
            result.push({
                text: index + 1,
                callback_data: createAction(SET_AVAILABLE_SEATS_CUNT, index + 1),
            });

            return result;
        }, []), 4)
    }
};

export const tripSummaryKeyboards = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: FINISH_TRIP_CREATION }],
            [{ text: GO_TO_THE_MAIN_MENU }]
        ]
    }
};

export const availableSeatsCongratsKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: tripCreationMessages(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }],
        ]
    }
};

export const availableSeatsKeyboardBlocked = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: tripCreationMessages(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }],
        ]
    }
};
