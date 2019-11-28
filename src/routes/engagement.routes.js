import { Router } from "express";
import Engagement from "../model/engagement";

const engagementRouter = new Router();

engagementRouter.post("/", (req, res) => {
  Engagement.create(req.body)
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

engagementRouter.get("/", (req, res) => {
  req.query.active = true;
  Engagement.find(req.query, (err, engagements) => {
    res.send(engagements);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

engagementRouter.get("/:id", (req, res) => {
  Engagement.findById(req.params.id, (err, engagements) => {
    res.send(engagements);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

engagementRouter.patch("/:id", (req, res) => {
  Engagement.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

engagementRouter.delete("/:id", (req, res) => {
  Engagement.findByIdAndUpdate(req.params.id, { $set: { active: false } })
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(500);
    });
});

export default engagementRouter;
