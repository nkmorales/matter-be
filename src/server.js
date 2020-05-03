import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import users from "./routes/user.routes";
import company from "./routes/company.routes";
import engagement from "./routes/engagement.routes";
import ping from "./routes/ping.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;
const { MONGODB_URI } = process.env;

mongoose.Promise = Promise;
mongoose
  .connect(MONGODB_URI, {
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("connected to MongoDB!"))
  .catch(() => console.log("Failed to connect to MongoDB -- did you start MongoDB?"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json(), cors());
app.use(express.static("dist"));

// Passport middleware
app.use(passport.initialize());
// Passport config
// require("./utils/passport")(passport);

const api = express.Router();
api.use("/users", users);
api.use("/companies", company);
api.use("/engagements", engagement);
app.use("/ping", ping);
app.use("/api", api);

app.all("*", (req, res) => {
  console.log("Returning 404 from catch all route");
  res.sendStatus(404);
});

export const start = () => {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};

export const stop = () => {
  app.close(PORT, () => {
    console.log(`Shut down on port: ${PORT}`);
  });
};
