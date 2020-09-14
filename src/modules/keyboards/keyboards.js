import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import {
    MY_TRIPS,
    FIND_TRIP,
    BOOK_TRIP_TEXT,
    UNBOOK_TRIP_TEXT,
    BOOK_TRIP_ACTION,
    UNBOOK_TRIP_ACTION,
    REMOVE_TRIP_BUTTON,
    NEXT_CITY_IN_THE_TRIP,
    FIND_TRIP_GO_TO_CALENDAR,
    SHOW_BOOKED_TRIPS_MESSAGE,
    SHOW_I_AM_DRIVING_MESSAGE,
    CANCEL_TRIP_BOOKING_ACTION,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
    FIND_TRIP_GO_TO_CALENDAR_BLOCKED,
    BLOCKED_GO_TO_TRIP_END_TIME_PICKER,
} from '../../common/constants/commonСonstants';
import { LANGUAGES } from '../../common/constants/botSettings';
import { FIND_TRIPS_KEYBOARDS_DAY } from '../../common/constants/findTripConstants';
import { keysActions, getLocalizedMessage } from '../../common/messages'
import { FINAL_CITY_IN_THE_TRIP_KEY } from '../../common/messages/tripCreationMessages/calendarKeysActions';
import { SET_AVAILABLE_SEATS_CUNT, BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY } from '../../common/messages/tripCreationMessages/availableSeatsKeysActions';

export const phoneNumberKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: getLocalizedMessage(keysActions.SEND_MY_PHONE_NUMBER_MESSAGES_KEY, eventObject),
                    request_contact: true
                }
            ],
            [
                {
                    text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject),
                    callback_data: createAction(getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject))
                },
            ]
        ]
    }
});

export const phoneNumberKeyboardGoToSummarise = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                { text: getLocalizedMessage(keysActions.GO_TO_TRIP_SUMMARISE_MESSAGES_KEY, eventObject) }
            ],
            [
                { text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) },
            ]
        ]
    }
});

export const tripPriceSettingsKeyboardInitial = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }]
        ]
    }
});

export const tripPriceSettingsKeyboardFinish = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }]
        ]
    }
});

export const availableSeatsKeyboard = eventObject => ({
    reply_markup: {
        inline_keyboard: chunk(new Array(8).fill(null).reduce((result, item, index) => {
            result.push({
                text: index + 1,
                callback_data: createAction(SET_AVAILABLE_SEATS_CUNT, index + 1),
            });

            return result;
        }, []), 4)
    }
});

export const tripSummaryKeyboards = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: getLocalizedMessage(keysActions.FINISH_TRIP_CREATION_MESSAGES_KEY, eventObject)}],
            [{text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject)}]
        ]
    }
});

export const availableSeatsCongratsKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const availableSeatsKeyboardBlocked = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const initialKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                { text: FIND_TRIP },
                { text: getLocalizedMessage(keysActions.PROPOSE_TRIP_KEY, eventObject) }],
            [
                { text: MY_TRIPS },
                { text: getLocalizedMessage(keysActions.LANGUAGES_KEY, eventObject)},
            ],

        ]
    }
});

export const languagesKeyboard = queryObject => ({
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: chunk(new Array(Object.values(LANGUAGES)).fill(null).map((language, item, index) => ({
            text: keysActions.LANGUAGES_KEY[language],
            callback_data: createAction(keysActions.LANGUAGES_ACTION_TYPE, language),
        })))
    }
});

export const findTripsDaysAndCalendarKeyboard = {
    reply_markup: {
        inline_keyboard: chunk(new Array(4).fill(null).reduce((result, item, index) => {
            result.push({
                text: FIND_TRIPS_KEYBOARDS_DAY[index],
                callback_data: createAction(FIND_TRIPS_KEYBOARDS_DAY[index], index),
            });

            return result;
        }, []), 2)
    }
};

export const myTripsTripActionKeyboard = (trip_id, alreadyBookedTripsIds, includeReplyMarkup = false) => {
    const text = Object.values(alreadyBookedTripsIds).includes(trip_id) ? UNBOOK_TRIP_TEXT : BOOK_TRIP_TEXT;
    const callback_data = Object.values(alreadyBookedTripsIds).includes(trip_id)
        ? createAction(UNBOOK_TRIP_ACTION, trip_id)
        : createAction(BOOK_TRIP_ACTION, trip_id);

    const button = {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {
                    text,
                    callback_data
                }
            ],
        ]
    }

    return includeReplyMarkup ? { reply_markup: button } : button
};

export const myTripsChooseRoleKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: SHOW_BOOKED_TRIPS_MESSAGE,
                },
                {
                    text: SHOW_I_AM_DRIVING_MESSAGE,
                }
            ],
            [
                {
                    text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject),
                },
            ]
        ]
    }
});

export const calendarKeyboard = (nextButtonAction, eventObject) => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: nextButtonAction,
                }
            ],
            [
                {
                    text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject),
                },
            ]
        ]
    }
});

export const cancelBookedTripKeyboard = tripId => ({
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {
                    text: UNBOOK_TRIP_TEXT,
                    callback_data: createAction(CANCEL_TRIP_BOOKING_ACTION, tripId)
                }
            ],
        ]
    }
});

export const removeTripKeyBoard = trip_id => ({
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {
                    text: REMOVE_TRIP_BUTTON,
                    callback_data: createAction(REMOVE_TRIP_BUTTON, trip_id)
                }
            ],
        ]
    }
});


export const blockedTimePickerKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: BLOCKED_GO_TO_TRIP_END_TIME_PICKER }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const blockedTimeStopPickerKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const goToMenuKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject),
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
            ],
        ]
    }
});

export const calendarNotCompletedKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject),
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
            ],
        ]
    }
});

export const creatingCitiesKeyboards = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(FINAL_CITY_IN_THE_TRIP_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const blockedCitiesKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: BLOCKED_FINAL_CITY_IN_THE_TRIP }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const blockedFindTripCitiesKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: FIND_TRIP_GO_TO_CALENDAR_BLOCKED }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const findTripGoToCalendarKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: FIND_TRIP_GO_TO_CALENDAR }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject)}],
        ]
    }
});
