import { Router } from "express";
import Event from "../model/event";

const eventRouter = new Router();

eventRouter.post("/", (req, res) => {
  Event.create(req.body)
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

eventRouter.get("/", (req, res) => {
  req.query.active = true;
  Event.find(req.query, (err, events) => {
    res.send(events);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

eventRouter.get("/:id", (req, res) => {
  Event.findById(req.params.id, (err, events) => {
    res.send(events);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

eventRouter.patch("/:id", (req, res) => {
  Event.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

eventRouter.delete("/:id", (req, res) => {
  Event.findByIdAndUpdate(req.params.id, { $set: { active: false } })
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(500);
    });
});

export default eventRouter;
