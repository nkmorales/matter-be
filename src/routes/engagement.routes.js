import { Router } from "express";
import multer from "multer";
import fs from "fs";
import csv from "fast-csv";
import Engagement from "../model/engagement";
import {
  updateScore, createCompanies, randomString, createEngagement
} from "../utils/utils";

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
  if (!req.file) { res.status(400).send("Bad request -- must send file"); }
  csv
    .parseFile(req.file.path, { headers: true })
    .on("data", data => {
      companies.add({ name: data.Startup, account_id: null });
      engagements.push(data);
    })
    .on("end", async () => {
      fs.unlinkSync(req.file.path);
      try {
        await createCompanies([...companies]);
      } catch {
        return res.status(500).send("Error creating companies");
      }
      try {
        await Promise.all(engagements.map(engagement => createEngagement({
          id: randomString(17),
          date: engagement.Date,
          activity_type: engagement.Engagement,
          startup: engagement.Startup,
          partner: engagement["Partner, Investor, Organization"]
        })));
      } catch {
        return res.status(500).send("Error creating engagements");
      }
      try {
        await Promise.all(engagements.map((engagement) => updateScore(engagement.Startup)));
      } catch {
        return res.status(500).send("Error updating engagement scores");
      }
      return res.status(200).send();
    })
    .on("error", err => res.status(500).send(err));
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
