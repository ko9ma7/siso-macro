const setGlobal = () => {
    global.isDev = process.env.APP_ENV?.trim() == 'dev';
};
export default setGlobal;