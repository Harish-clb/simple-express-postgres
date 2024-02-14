const express = require("express");

const app = express();

const db = require("./app/models");
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
