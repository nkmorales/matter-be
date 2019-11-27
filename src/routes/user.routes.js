import { Router } from "express";
import User from "../model/user";

const userRouter = new Router();

userRouter.post("/", (req, res) => {
  User.create(req.body)
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

userRouter.get("/", (req, res) => {
  req.query.active = true;
  User.find(req.query, (err, users) => {
    res.send(users);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

userRouter.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.send(user);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

userRouter.delete("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: { active: false } },
    (err, user) => {
      res.send(user);
    }
  ).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

export default userRouter;
