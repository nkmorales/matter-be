import { Router } from "express";
import Company from "../model/company";

const companyRouter = new Router();

companyRouter.post("/", (req, res) => {
  Company.create(req.body)
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

companyRouter.get("/", (req, res) => {
  req.query.active = true;
  Company.find(req.query, (err, companies) => {
    res.send(companies);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

companyRouter.get("/:id", (req, res) => {
  Company.findById(req.params.id, (err, companies) => {
    res.send(companies);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

companyRouter.patch("/:id", (req, res) => {
  Company.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

companyRouter.delete("/:id", (req, res) => {
  Company.findByIdAndUpdate(req.params.id, { $set: { active: false } })
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(500);
    });
});

export default companyRouter;
