import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import { keysActions, getLocalizedMessage } from '../../common/messages'
import { SET_AVAILABLE_SEATS_CUNT, BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY } from '../../common/messages/tripCreationMessages/availableSeatsKeysActions';
import { CANCEL_TRIP_BOOKING_ACTION,  BOOK_TRIP_ACTION, UNBOOK_TRIP_ACTION, } from '../../common/messages/myTrips/myTripsKeysActions';

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
            [{ text: getLocalizedMessage(keysActions.MY_TRIPS_MESSAGES_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.FIND_TRIP_ACTION_MESSAGES_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.PROPOSE_TRIP_KEY, eventObject) }],
        ]
    }
});

export const findTripsDaysAndCalendarKeyboard = eventObject => ({
    reply_markup: {
        inline_keyboard: chunk(new Array(4).fill(null).reduce((result, item, index) => {
            result.push({
                text: getLocalizedMessage(keysActions.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES_KEY, eventObject)[index],
                callback_data: createAction(getLocalizedMessage(keysActions.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES_KEY, eventObject)[index], index),
            });

            return result;
        }, []), 2)
    }
});

export const myTripsTripActionKeyboard = ({ trip_id, alreadyBookedTripsIds, query, includeReplyMarkup = false }) => {
    const text = Object.values(alreadyBookedTripsIds).includes(trip_id)
        ? getLocalizedMessage(keysActions.UNBOOK_TRIP_MESSAGES_KEY, query)
        : getLocalizedMessage(keysActions.BOOK_TRIPS_MESSAGES_KEY, query);

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
                    text: getLocalizedMessage(keysActions.SHOW_BOOKED_TRIPS_MESSAGES_KEY, eventObject),
                },
                {
                    text: getLocalizedMessage(keysActions.SHOW_I_AM_DRIVING_MESSAGES_KEY, eventObject)
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

export const cancelBookedTripKeyboard = (tripId, eventObject) => ({
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {
                    text: getLocalizedMessage(keysActions.UNBOOK_TRIP_MESSAGES_KEY, eventObject),
                    callback_data: createAction(CANCEL_TRIP_BOOKING_ACTION, tripId)
                }
            ],
        ]
    }
});

export const removeTripKeyBoard = (trip_id, eventObject) => ({
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {
                    text: getLocalizedMessage(keysActions.REMOVE_TRIP_BUTTON_MESSAGES_KEY, eventObject),
                    callback_data: createAction(keysActions.REMOVE_TRIP_BUTTON_ACTION, trip_id)}
                ],
        ]
    }
});


export const blockedTimePickerKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY, eventObject) }],
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
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const calendarNotCompletedKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const creatingCitiesKeyboards = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.FINAL_CITY_IN_THE_TRIP_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const blockedCitiesKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.BLOCKED_FINAL_CITY_IN_THE_TRIP_MESSAGES) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const blockedFindTripCitiesKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.FIND_TRIP_GO_TO_CALENDAR_BLOCKED_ACTION_MESSAGES_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject) }],
        ]
    }
});

export const findTripGoToCalendarKeyboard = eventObject => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: getLocalizedMessage(keysActions.FIND_TRIP_GO_TO_CALENDAR_MESSAGES_KEY, eventObject) }],
            [{ text: getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, eventObject)}],
        ]
    }
});
