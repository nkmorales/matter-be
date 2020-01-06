import Company from "../model/company";

function createCompanies(companies) {
  let results = companies.map(company_name => {
    console.log(
      Company.find().then(company => console.log("rg company: ", company))
    );
    return Company.findOne({ name: company_name }).then(company => {
      if (company === null) {
        Company.create({
          name: company_name,
          size: 0,
          cohort: "filler",
          category: "filler"
        });
      }
    });
  });
  return Promise.all(results);
}

async function updateScore(company_name, engagement) {
  return Company.findOne({ name: company_name })
    .then(async company => {
      if (company === null)
        throw "Creating Score for Company that does not exist";
      if (engagement === "Orientation Day") {
        company.matter_team += 1;
      } else if (engagement === "Deep Dive") {
        company.matter_team += 1;
      } else if (engagement === "Pitch Practice") {
        company.matter_team += 1;
      } else if (engagement === "Pitch Deck Review") {
        company.matter_team += 1;
      } else if (engagement === "Opportunity") {
        company.opp_conn += 1;
      } else if (engagement === "Connection") {
        company.opp_conn += 1;
      } else if (engagement === "Conference") {
        company.opp_conn += 1;
      } else if (engagement === "Partner Engagement") {
        company.partner_eng += 1;
      } else if (engagement === "Partner Access") {
        company.partner_eng += 1;
      } else if (engagement === "Mentor Clinic") {
        company.mentor_clinic += 1;
      } else if (engagement === "Workshop") {
        company.workshop += 1;
      } else if (engagement === "Conference Room Booking") {
        company.fac += 1;
      } else if (engagement === "KeyCard Swipe") {
        company.fac += 1;
      } else if (engagement === "MATTER Event") {
        company.matter_event += 1;
      } else if (engagement === "Hosting event") {
        company.matter_event += 1;
      }
      await company.save();
    })
    .catch(err => {
      console.log(err);
    });
}

export { updateScore, createCompanies };
