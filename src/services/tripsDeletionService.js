import { removeExpiredTrips } from './utils';


const tripDeletionService = async () => {
    await removeExpiredTrips();
};

export default tripDeletionService;