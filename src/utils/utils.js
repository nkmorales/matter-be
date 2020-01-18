import Company from "../model/company";

function createCompanies(companies) {
  const results = companies.map((companyName) => {
    if (companyName === undefined) return Promise.reject(new Error("company name is required"));
    return Company.findOne({ name: companyName }, (company) => {
      if (company === null) {
        Company.create({
          name: companyName,
          size: 0,
          cohort: "filler",
          category: "filler"
        });
      }
    }).exec();
  });
  return Promise.all(results);
}

async function updateScore(companyName, engagement) {
  let key;
  if (engagement === "Orientation Day") {
    key = "matter_team";
  } else if (engagement === "Deep Dive") {
    key = "matter_team";
  } else if (engagement === "Pitch Practice") {
    key = "matter_team";
  } else if (engagement === "Pitch Deck Review") {
    key = "matter_team";
  } else if (engagement === "Opportunity") {
    key = "opp_conn";
  } else if (engagement === "Connection") {
    key = "opp_conn";
  } else if (engagement === "Conference") {
    key = "opp_conn";
  } else if (engagement === "Partner Engagement") {
    key = "partner_eng";
  } else if (engagement === "Partner Access") {
    key = "partner_eng";
  } else if (engagement === "Mentor Clinic") {
    key = "mentor_clinic";
  } else if (engagement === "Workshop") {
    key = "workshop";
  } else if (engagement === "Conference Room Booking") {
    key = "fac";
  } else if (engagement === "KeyCard Swipe") {
    key = "fac";
  } else if (engagement === "MATTER Event") {
    key = "matter_event";
  } else if (engagement === "Hosting event") {
    key = "matter_event";
  }
  const update = {};
  update[key] = 1;
  return Company.updateOne({ name: companyName }, { $inc: update });
}

export { updateScore, createCompanies };
