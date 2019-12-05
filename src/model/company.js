import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: Number, required: true, default: 0 },
    matter_team_score: { type: Number, required: true, default: 0 },
    workshop_score: { type: Number, required: true, default: 0 },
    partner_eng_score: { type: Number, required: true, default: 0 },
    matter_event_score: { type: Number, required: true, default: 0 },
    opp_conn_score: { type: Number, required: true, default: 0 },
    mentor_clinic_score: { type: Number, required: true, default: 0 },
    fac_score: { type: Number, required: true, default: 0 },
    category: { type: String, required: true, default: "" },
    cohort: { type: String, required: true, default: "" },
    active: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

const Company = mongoose.model("company", companySchema);
export default Company;
