import Company from "../model/company";
import Engagement from "../model/engagement";

function createCompanies(companies) {
  const results = companies.map((companyObj) => Company.find({ name: companyObj.name }).exec().then((docs) => {
    if (docs.length === 0) {
      Company.create({
        name: companyObj.name,
        account_id: companyObj.account_id
      });
    }
  }));
  return Promise.all(results).catch(err => console.log(err));
}

function createEngagement(engagement) {
  Engagement.find({ id: engagement.id }).exec().then((docs) => {
    if (docs.length === 0) {
      Engagement.create(engagement);
    }
  });
}

async function updateScore(companyName) {
  return Engagement.find({ startup: companyName }).exec().then(async (docs) => {
    const update = {
      matter_team: 0,
      opp_conn: 0,
      partner_eng: 0,
      mentor_clinic: 0,
      workshop: 0,
      fac: 0,
      matter_event: 0
    };
    docs.forEach(engagement => {
      if (engagement.activity_type === "Orientation Day") {
        update.matter_team += 20;
      } else if (engagement.activity_type === "Deep Dive") {
        update.matter_team += 20;
      } else if (engagement.activity_type === "Pitch Practice") {
        update.matter_team += 15;
      } else if (engagement.activity_type === "Pitch Deck Review") {
        update.matter_team += 10;
      } else if (engagement.activity_type === "Opportunity") {
        update.opp_conn += 0;
      } else if (engagement.activity_type === "Connection") {
        update.opp_conn += 7;
      } else if (engagement.activity_type === "Conference") {
        update.opp_conn += 15;
      } else if (engagement.activity_type === "Partner Engagement") {
        update.partner_eng += 15;
      } else if (engagement.activity_type === "Partner Access") {
        update.partner_eng += 15;
      } else if (engagement.activity_type === "Mentor Clinic") {
        update.mentor_clinic += 7;
      } else if (engagement.activity_type === "Workshop") {
        update.workshop += 7;
      } else if (engagement.activity_type === "Conference Room Booking") {
        update.fac += 0.5;
      } else if (engagement.activity_type === "KeyCard Swipe") {
        update.fac += 0.1;
      } else if (engagement.activity_type === "MATTER Event") {
        update.matter_event += 5;
      } else if (engagement.activity_type === "Hosting event") {
        update.matter_event += 25;
      }
    });
    console.log(update);
    return Company.updateOne({ name: companyName }, update);
  });
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
