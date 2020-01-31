import { Router } from "express";
import multer from "multer";
// //import csv from "fast-csv";
// //import fs from "fs";
import testEngagement from "../model/testEngagement";
import { updateScore } from "../utils/utils";

const testEngagementRouter = new Router();
const upload = multer({ dest: "tmp/csv/" });

testEngagementRouter.post("/", (req, res) => {
  testEngagement.create(req.body)
    .then(token => {
      updateScore(req.body.startup, req.body.name).then(() => res.send(token));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

testEngagementRouter.post("/upload", upload.single("file"), (req, res) => {
  csv
    .parseFile(req.file.path, { headers: true })
    .on("data", data => {
      testEngagement.create({
        date: data.Date,
        startup: data.Startup,
        name: data.testEngagement,
        partner: data["Partner, Investor, Organization"]
      });
      updateScore(data.Startup, data.testEngagement).catch(err => res.status(500).send(err));
    })
    .on("end", () => {
      fs.unlinkSync(req.file.path);
      res.status(200).send();
    })
    .on("error", err => {
      res.status(500).send(err);
    });
});

testEngagementRouter.get("/", (req, res) => {
  req.query.active = true;
  testEngagement.find(req.query, (err, testEngagements) => {
    res.send(testEngagements);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

testEngagementRouter.get("/:id", (req, res) => {
  testEngagement.findById(req.params.id, (err, testEngagements) => {
    res.send(testEngagements);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});


testEngagementRouter.delete("/:id", (req, res) => {
  testEngagement.findByIdAndUpdate(req.params.id, { $set: { active: false } })
    .then(token => res.send(token))
    .catch(err => {
      console.log(err);
      res.status(500).send(500);
    });
});

export default testEngagementRouter;
