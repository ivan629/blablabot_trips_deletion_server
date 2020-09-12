import { LANGUAGES } from '../../constants/botSettings';
import * as tripCitiesKeysActions from './tripCitiesKeysActions';
import * as calendarKeysActions from './calendarKeysActions';
import * as availableSeatsKeysActions from './availableSeatsKeysActions';
import * as tripPriceKeysActions from './tripPriceKeysActions';

import * as citiesMessages from './citiesMessages';
import * as calendarMessages from './calendarMessages';
import * as availableSeatsMessages from './availableSeatsMessages';
import * as tripPriceMessages from './tripPriceMessages';

const { ua, ru, en } = LANGUAGES;

const tripCitiesMessagesMap = {
    [tripCitiesKeysActions.SHOW_NEXT_CITY_KEY]: citiesMessages.SHOW_NEXT_CITY_MESSAGES,
    [tripCitiesKeysActions.CHOOSE_TRIP_CITY_KEY]: citiesMessages.CHOOSE_TRIP_CITY_MESSAGES,
    [tripCitiesKeysActions.NOT_FOUND_CITY_MESSAGE_KEY]: citiesMessages.NOT_FOUND_CITY_MESSAGES,
    [tripCitiesKeysActions.BLOCKED_FINAL_CITY_KEY]: citiesMessages.BLOCKED_FINAL_CITY_MESSAGES,
    [tripCitiesKeysActions.CITIES_ADD_NEW_HELP_TEXT_KEY]: citiesMessages.CITIES_ADD_NEW_HELP_TEXT_MESSAGES,
    [tripCitiesKeysActions.CITIES_INITIAL_HELP_TEXT_KEY]: citiesMessages.CITIES_INITIAL_HELP_TEXT_MESSAGES,
    [tripCitiesKeysActions.CITY_ALREADY_EXISTS_ERROR_MESSAGE_KEY]: citiesMessages.CITY_ALREADY_EXISTS_ERROR_MESSAGES,
}

const calendarMessagesMap = {
    [calendarKeysActions.TIME_CHOOSING_MESSAGE_KEY]: calendarMessages.TIME_CHOOSING_MESSAGES,
    [calendarKeysActions.GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY]: calendarMessages.GO_TO_TRIP_END_TIME_PICKER_MESSAGES,
    [calendarKeysActions.BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY]: calendarMessages.BLOCKED_GO_TO_TIME_PICKER_MESSAGES,
    [calendarKeysActions.TIME_CHOOSING_HELP_MESSAGE_KEY]: calendarMessages.TIME_CHOOSING_HELP_MESSAGES,
    [calendarKeysActions.GO_TO_TIME_PICKER_MESSAGE_KEY]: calendarMessages.GO_TO_TIME_PICKER_MESSAGES,
    [calendarKeysActions.BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY]: calendarMessages.BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGES,
    [calendarKeysActions.TIME_STOP_CHOOSING_HELP_MESSAGE_KEY]: calendarMessages.TIME_STOP_CHOOSING_HELP_MESSAGES,
    [calendarKeysActions.PROPOSE_TRIP_KEY]: calendarMessages.PROPOSE_TRIP_MESSAGES,
    [calendarKeysActions.FINAL_CITY_IN_THE_TRIP_KEY]: calendarMessages.FINAL_CITY_IN_THE_TRIP_MESSAGES,
    [calendarKeysActions.CALENDAR_START_TRIP_KEY]: calendarMessages.CALENDAR_START_TRIP_MESSAGES,
    [calendarKeysActions.CALENDAR_CONGRATS_MESSAGE_START_KEY]: calendarMessages.CALENDAR_CONGRATS_MESSAGE_START,
    [calendarKeysActions.CALENDAR_CONGRATS_MESSAGES_STOP_KEY]: calendarMessages.CALENDAR_CONGRATS_MESSAGES_STOP,
    [calendarKeysActions.CALENDAR_HELP_MESSAGE_KEY]: calendarMessages.CALENDAR_HELP_MESSAGES,
    [calendarKeysActions.BLOCKED_GO_TO_TIME_PICKER_KEYBOARD_KEY]: calendarMessages.BLOCKED_GO_TO_TIME_PICKER_KEYBOARD_MESSAGES,
}

const availableSeatsMessagesMap = {
    [availableSeatsKeysActions.AVAILABLE_SEATS_MESSAGE_KEY]: availableSeatsMessages.AVAILABLE_SEATS_MESSAGE,
    [availableSeatsKeysActions.CHOSEN_AVAILABLE_SEATS_MESSAGES_KEY]: availableSeatsMessages.CHOSEN_AVAILABLE_SEATS_MESSAGES,
    [availableSeatsKeysActions.CHOOSE_AVAILABLE_SEATS_MESSAGES_KEY]: availableSeatsMessages.CHOOSE_AVAILABLE_SEATS_MESSAGES,
    [availableSeatsKeysActions.AVAILABLE_SEATS_BLOCKED_MESSAGE_KEY]: availableSeatsMessages.AVAILABLE_SEATS_BLOCKED_MESSAGES,
    [availableSeatsKeysActions.GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES_KEY]: availableSeatsMessages.GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES,
    [availableSeatsKeysActions.BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGE_KEY]: availableSeatsMessages.BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES,
    [availableSeatsKeysActions.BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY]: availableSeatsMessages.BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_MESSAGES,
}

const tripPriceMessagesMap = {
    [tripPriceKeysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY]: tripPriceMessages.CONFIRM_TRIP_PRICE_MESSAGES,
    [tripPriceKeysActions.TRIP_PRICE_BLOCKED_MESSAGES_KEY]: tripPriceMessages.TRIP_PRICE_BLOCKED_MESSAGES,
    [tripPriceKeysActions.SET_TRIP_PRICE_INITIAL_MESSAGES_KEY]: tripPriceMessages.SET_TRIP_PRICE_INITIAL_MESSAGES,
    [tripPriceKeysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_KEY]: tripPriceMessages.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES,
    [tripPriceKeysActions.TRIP_PRICE_SETTINGS_FINISH_MESSAGES_KEY]: tripPriceMessages.TRIP_PRICE_SETTINGS_FINISH_MESSAGES,
    [tripPriceKeysActions.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES_KEY]: tripPriceMessages.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES,
    [tripPriceKeysActions.TRIP_PRICE_SETTINGS_INITIAL_MESSAGES_KEY]: tripPriceMessages.TRIP_PRICE_SETTINGS_INITIAL_MESSAGES,
    [tripPriceKeysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED_KEY]: tripPriceMessages.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED,
}

const messagesMap = {
    ...calendarMessagesMap,
    ...tripPriceMessagesMap,
    ...tripCitiesMessagesMap,
    ...availableSeatsMessagesMap,
}

export const keysActions = {
    ...calendarKeysActions,
    ...tripPriceKeysActions,
    ...tripCitiesKeysActions,
    ...availableSeatsKeysActions,
};

export const tripCreationMessages = message => {
    return messagesMap[message][en];
}
