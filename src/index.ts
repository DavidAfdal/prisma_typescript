import express, { Request, Response, NextFunction, response } from "express";
import userRouter from "./routes/user.route";
import passport from "passport";
import "./config/passport";
const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/api/user", userRouter);

app.listen(5000, () => {
  console.log("listen on port 3000");
});
