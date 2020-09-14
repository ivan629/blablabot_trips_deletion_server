import { get } from 'lodash';
import { LANGUAGES } from '../constants/botSettings';
import * as tripCitiesKeysActions from './tripCreationMessages/tripCitiesKeysActions';
import * as calendarKeysActions from './tripCreationMessages/calendarKeysActions';
import * as availableSeatsKeysActions from './tripCreationMessages/availableSeatsKeysActions';
import * as tripPriceKeysActions from './tripCreationMessages/tripPriceKeysActions';
import * as languagesKeysActions from './tripCreationMessages/languagesKeysActions';
import * as phoneNumberKeysActions from './tripCreationMessages/phoneNumberKeysActions';
import * as tripSummariseKeysActions from './tripCreationMessages/tripSummariseKeysActions';
import * as mainKeysActions from './main/mainKeysActions';

import * as citiesMessages from './tripCreationMessages/citiesMessages';
import * as calendarMessages from './tripCreationMessages/calendarMessages';
import * as availableSeatsMessages from './tripCreationMessages/availableSeatsMessages';
import * as tripPriceMessages from './tripCreationMessages/tripPriceMessages';
import * as languagesMessages from './tripCreationMessages/languagesMessages';
import * as phoneNumberMessages from './tripCreationMessages/phoneNumberMessages';
import * as tripSummariseMessages from './tripCreationMessages/tripSummariseMessages';
import * as mainMessages from './main/mainMessages';

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

const languagesMessagesMap = {
    [languagesKeysActions.LANGUAGES_KEY]: languagesMessages.LANGUAGES_MESSAGES,
    [languagesKeysActions.LANGUAGES_START_SELECTION_HELP_TEXT_KEY]: languagesMessages.LANGUAGES_START_SELECTION_HELP_TEXT,
    [languagesKeysActions.LANGUAGES_CHANGED_MESSAGES_KEY]: languagesMessages.LANGUAGES_CHANGED_MESSAGES,
}

const phoneNumberMessagesMap = {
    [phoneNumberKeysActions.SHARE_CARRIER_PHONE_NUMBER_MESSAGE_KEY]: phoneNumberMessages.SHARE_CARRIER_PHONE_NUMBER_MESSAGES,
    [phoneNumberKeysActions.GO_TO_TRIP_SUMMARISE_MESSAGES_KEY]: phoneNumberMessages.GO_TO_TRIP_SUMMARISE_MESSAGES,
    [phoneNumberKeysActions.SEND_MY_PHONE_NUMBER_MESSAGES_KEY]: phoneNumberMessages.SEND_MY_PHONE_NUMBER_MESSAGES,
}

const tripSummariseMessagesMap = {
    [tripSummariseKeysActions.TRIP_CREATION_SUMMARISE_INITIAL_MESSAGES_KEY]: tripSummariseMessages.TRIP_CREATION_SUMMARISE_INITIAL_MESSAGES,
    [tripSummariseKeysActions.TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGES_KEY]: tripSummariseMessages.TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGES,
    [tripSummariseKeysActions.FINISH_TRIP_CREATION_MESSAGES_KEY]: tripSummariseMessages.FINISH_TRIP_CREATION_MESSAGES,
}

const mainMessagesMap = {
    [mainKeysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY]: mainMessages.GO_TO_THE_MAIN_MENU_MESSAGES,
}

const messagesMap = {
    ...mainMessagesMap,
    ...calendarMessagesMap,
    ...languagesMessagesMap,
    ...tripPriceMessagesMap,
    ...tripCitiesMessagesMap,
    ...phoneNumberMessagesMap,
    ...tripSummariseMessagesMap,
    ...availableSeatsMessagesMap,
}

export const keysActions = {
    ...mainKeysActions,
    ...languagesKeysActions,
    ...calendarKeysActions,
    ...tripPriceKeysActions,
    ...tripCitiesKeysActions,
    ...phoneNumberKeysActions,
    ...tripSummariseKeysActions,
    ...availableSeatsKeysActions,
};

export const getLocalizedMessage = (message, eventObject) => {
    const languageCode = get(eventObject, 'from.language_code', ru);
    return messagesMap[message][languageCode];
}
