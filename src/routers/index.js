const appRouters = (expressApp) => {
    expressApp.get('/', (req, res) => res.send('Hello, world!'));
};

export default appRouters;
