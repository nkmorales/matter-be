import { Router } from "express";
import axios from "axios";
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

userRouter.post("/salesforce/auth", (req, res) => {
  axios.post(`https://login.salesforce.com/services/oauth2/token?username=${process.env.USERNAME}&password=${process.env.PASSWORD}${process.env.SECURITY_TOKEN}&grant_type=${process.env.GRANT_TYPE}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
    .then(resp => {
      res.send(resp.data);
    });
});

export default userRouter;
