const userRoutes = require('./user.routes');

const BASE_PATH = '/api';
const USERS_BASE_PATH = `${BASE_PATH}/users`;

module.exports = (app) => {
    app.use(USERS_BASE_PATH, userRoutes);
};