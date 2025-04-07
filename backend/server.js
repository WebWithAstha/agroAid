import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import app from "./src/index.js";

// connect to database
connectDB();

// listening port
app.listen(config.port, (req, res, next) => {
  console.log("server listening on port " + config.port);
});
