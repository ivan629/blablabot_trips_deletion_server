import { CHOSEN_AVAILABLE_SEATS_MESSAGE_PART } from '../constants/commonСonstants';

const getSettAvailableSeatsDataMessage = seatsCount =>
    CHOSEN_AVAILABLE_SEATS_MESSAGE_PART + ` <b>${seatsCount}</b> ` + `${seatsCount > 1 ? 'вільне місць 💺' : 'вільних місце 💺'}`;

export default {
    getSettAvailableSeatsDataMessage,
}