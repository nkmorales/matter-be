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
        company.matter_team_score += 20;
      } else if (engagement === "Deep Dive") {
        company.matter_team_score += 20;
      } else if (engagement === "Pitch Practice") {
        company.matter_team_score += 15;
      } else if (engagement === "Pitch Deck Review") {
        company.matter_team_score += 10;
      } else if (engagement === "Opportunity") {
        company.opp_conn_score += 10;
      } else if (engagement === "Connection") {
        company.opp_conn_score += 7;
      } else if (engagement === "Conference") {
        company.opp_conn_score += 15;
      } else if (engagement === "Partner Engagement") {
        company.partner_eng_score += 15;
      } else if (engagement === "Partner Access") {
        company.partner_eng_score += 15;
      } else if (engagement === "Mentor Clinic") {
        company.mentor_clinic_score += 7;
      } else if (engagement === "Workshop") {
        company.workshop_score += 7;
      } else if (engagement === "Conference Room Booking") {
        company.fac_score += 0.5;
      } else if (engagement === "KeyCard Swipe") {
        company.fac_score += 0.1;
      } else if (engagement === "MATTER Event") {
        company.matter_event_score += 5;
      } else if (engagement === "Hosting event") {
        company.matter_event_score += 25;
      }
      company.save();
    })
    .catch(err => {
      console.log(err);
    });
}

export { updateScore };
