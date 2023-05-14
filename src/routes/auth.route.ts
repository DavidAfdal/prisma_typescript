import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req: Request, res: Response) => {
  res.send("This Callback Route");
});
