import { Router } from "express";
import multer from "multer";
import csv from "fast-csv";
import fs from "fs";
import Engagement from "../model/engagement";
import { updateScore, createCompanies } from "../utils/utils";

const engagementRouter = new Router();
const upload = multer({ dest: "tmp/csv/" });

engagementRouter.post("/", (req, res) => {
  Engagement.create(req.body)
    .then(token => {
      updateScore(req.body.startup, req.body.name).then(() => res.send(token));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

engagementRouter.post("/upload", upload.single("file"), async (req, res) => {
  const companies = new Set();
  const engagements = [];
  csv
    .parseFile(req.file.path, { headers: true })
    .on("data", data => {
      companies.add(data.Startup);
      engagements.push(data);
    })
    .on("end", async () => {
      fs.unlinkSync(req.file.path);
      await createCompanies([...companies]);
      engagements.forEach(engagement => Engagement.create({
        date: engagement.Date,
        name: engagement.Engagement,
        startup: engagement.Startup,
        partner: engagement["Partner, Investor, Organization"]
      }));
      await Promise.all(engagements.map(engagement => updateScore(engagement.Startup, engagement.Engagement)));
      res.status(200).send();
    })
    .on("error", err => {
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
