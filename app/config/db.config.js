const dbConfig = {
  HOST: "localhost",
  USER: "",
  PASSWORD: "",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5, // max pool connections allowed
    min: 0, // min pool connections allowed
    acquire: 30000, // max time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, // max time, in milliseconds that a connection can be idle before being released
  },
};

module.exports = dbConfig;
