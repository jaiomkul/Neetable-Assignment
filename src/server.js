require("dotenv").config();

const app = require("./index");

const connect = require("./configs/db");

const port = process.env.PORT;

app.listen(port, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err.message);
  }

  console.log("listening on port", port);
});
