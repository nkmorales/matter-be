import Company from "../model/company";

async function updateScore(company_name, engagement) {
  return Company.findOne({ name: company_name })
    .then(async company => {
      if (company === null) {
        company = await Company.create({
          name: company_name,
          size: 0,
          cohort: "a",
          category: "a"
        });
      }
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

export { updateScore };
