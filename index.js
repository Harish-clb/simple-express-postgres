const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const swaggerOptions = {
  definition: {
    basePath: "api",
    openapi: "3.0.0",
    info: {
      title: "User Subscriptions API ",
      description:
        "This API provides the ability to manage user subscriptions.",
      version: "1.0.0",
    },
  },
  apis: ["./app/routes/*.js"], // route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const db = require("./app/models");
const PORT = process.env.PORT || 3000;

app.use(express.json());

require("./app/routes")(app);

// health check
app.get("/health", (req, res) => {
  res.status(200).send({
    status: "Server is running",
  });
});

init();

async function init() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
