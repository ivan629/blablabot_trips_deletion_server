import foundTripsListeners from './foundTripsListeners';

class FindTripCitiesModule {
    setListeners(bot) {
        foundTripsListeners(bot)
    }
}

export default FindTripCitiesModule;
