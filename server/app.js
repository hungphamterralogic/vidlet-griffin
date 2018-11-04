import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import User from "./models/User";
import session from "express-session";
import mongoSessionStore from "connect-mongo";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL_TEST;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};
mongoose.connect(
  MONGO_URL,
  options
);

const MongoStore = mongoSessionStore(session);

app.use(
  session({
    name: "vidletgriffin.sid",
    secret: "HD2w.)q*asdf$@#$SDfgdf$54FSDF^^&*&*,E^B)}FED5fWU!dKe[wk",
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000
    }
  })
);

app.get("/api", async (req, res) => {
  req.session.foo = "bar2222";
  const user = await User.findOne({ slug: "team-builder-book" });
  res.send(user.email);
});

app.listen(port, () => {
  console.log(`Server is listenning on port ${port}`);
});
