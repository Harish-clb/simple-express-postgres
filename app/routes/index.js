const userRoutes = require("./user.routes");
const subscriptionRoutes = require("./subscription.routes");

const BASE_PATH = "/api";
const USERS_BASE_PATH = `${BASE_PATH}/users`;
const SUBSCRIPTIONS_BASE_PATH = `${BASE_PATH}/subscriptions`;

module.exports = (app) => {
  app.use(USERS_BASE_PATH, userRoutes);
  app.use(SUBSCRIPTIONS_BASE_PATH, subscriptionRoutes);
};
