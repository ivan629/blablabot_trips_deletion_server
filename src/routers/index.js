import DataGeneratingController from '../controllers/DataGeneratingController';

const appRouters = (expressApp) => {
    expressApp.get('/generate', DataGeneratingController);
};

export default appRouters;
