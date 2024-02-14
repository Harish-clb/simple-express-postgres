const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: dbConfig.HOST,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const UserModel = require("./user.model.js")(sequelize, Sequelize);
const SubscriptionModel = require("./subscription.model.js")(
  sequelize,
  Sequelize
);

UserModel.hasMany(SubscriptionModel, { as: "subscriptions" });
SubscriptionModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

const db = {
  sequelize,
  Sequelize,
  user: UserModel,
  subscription: SubscriptionModel,
};

module.exports = db;
