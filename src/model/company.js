import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    account_id: { type: String, required: false, default: "" },
    matter_team: { type: Number, required: true, default: 0 },
    workshop: { type: Number, required: true, default: 0 },
    partner_eng: { type: Number, required: true, default: 0 },
    matter_event: { type: Number, required: true, default: 0 },
    opp_conn: { type: Number, required: true, default: 0 },
    mentor_clinic: { type: Number, required: true, default: 0 },
    fac: { type: Number, required: true, default: 0 },
    category: { type: String, required: false, default: "" },
    cohort: { type: String, required: false, default: "" },
    active: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

const Company = mongoose.model("company", companySchema);
export default Company;
