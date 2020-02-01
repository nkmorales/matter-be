import { Router } from "express";
import axios from "axios";
import Company from "../model/company";
import Engagement from "../model/engagement";
import { createCompanies, createEngagement, updateScore } from "../utils/utils";

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

companyRouter.get("/:name", (req, res) => {
  Company.findOne({ name: req.params.name }, async (err, company) => {
    if (company === null) return res.status(400).send("Not found");
    const config = {
      headers: { Authorization: `Bearer ${req.query.token}` }
    };
    const response = await axios.get(`${process.env.INSTANCE_URL}/services/data/${process.env.VERSION}/query?q=SELECT (SELECT  Id, ActivityType, ActivityDate FROM ActivityHistories) FROM Account WHERE Id='${company.account_id}'`,
      config).catch(error => {});
    if (response && response.status === 200 && response.data && response.data.records) {
      response.data.records[0].ActivityHistories.records.forEach(record => createEngagement(
        {
          id: record.Id,
          startup: req.params.name,
          activity_type: record.ActivityType ? record.ActivityType : "Partner Engagement",
          date: record.ActivityDate
        }
      ));
    } else {
      return res.send(company);
    }
    // updateScore(req.params.name).then(() => {
    //   if (response) { res.send(company); } else { res.status(500).send("Error getting company"); }
    // });
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

companyRouter.get("/:name/engagements", (req, res) => {
  Engagement.find({ startup: req.params.name }, (err, engagements) => {
    res.send(engagements);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

companyRouter.post("/salesforce/update", (req, res) => {
  const config = {
    headers: { Authorization: `Bearer ${req.body.token}` }
  };
  axios.get(
    `${process.env.INSTANCE_URL}/services/data/${process.env.VERSION}/query?q=SELECT+Id,Name,AccountSource+FROM+Account+WHERE+Member__c=true+AND+Member_Status__c='Active'`,
    config
  ).then(response => {
    const companies = response.data.records.map(record => ({ name: record.Name, account_id: record.Id }));
    createCompanies(companies).then(() => res.send("")).catch(err => res.status(500).send(err));
  }).catch(err => res.status(500).send(err));
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
