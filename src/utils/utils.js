import Company from "../model/company";
import Engagement from "../model/engagement";

function createCompanies(companies) {
  const results = companies.map((companyObj) => Company.find({ name: companyObj.name }, (err, docs) => {
    if (docs.length === 0) {
      Company.create({
        name: companyObj.name,
        account_id: companyObj.account_id
      });
    }
  }).exec());
  return Promise.all(results).catch(err => console.log(err));
}

function createEngagement(engagement) {
  Engagement.find({ id: engagement.id }, (err, docs) => {
    if (docs.length === 0) {
      Engagement.create(engagement);
    }
  });
}

async function updateScore(companyName, engagement) {
  const update = {};
  if (engagement === "Orientation Day") {
    update.matter_team = 20;
  } else if (engagement === "Deep Dive") {
    update.matter_team = 20;
  } else if (engagement === "Pitch Practice") {
    update.matter_team = 15;
  } else if (engagement === "Pitch Deck Review") {
    update.matter_team = 10;
  } else if (engagement === "Opportunity") {
    update.opp_conn = 0;
  } else if (engagement === "Connection") {
    update.opp_conn = 7;
  } else if (engagement === "Conference") {
    update.opp_conn = 15;
  } else if (engagement === "Partner Engagement") {
    update.partner_eng = 15;
  } else if (engagement === "Partner Access") {
    update.partner_eng = 15;
  } else if (engagement === "Mentor Clinic") {
    update.mentor_clinic = 7;
  } else if (engagement === "Workshop") {
    update.workshop = 7;
  } else if (engagement === "Conference Room Booking") {
    update.fac = 0.5;
  } else if (engagement === "KeyCard Swipe") {
    update.fac = 0.1;
  } else if (engagement === "MATTER Event") {
    update.matter_event = 5;
  } else if (engagement === "Hosting event") {
    update.matter_event = 25;
  }
  return Company.updateOne({ name: companyName }, { $inc: update });
}

function randomString(length) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export {
  updateScore, createCompanies, randomString, createEngagement
};
