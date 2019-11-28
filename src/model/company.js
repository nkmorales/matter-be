import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: Number, required: true },
    score: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    cohort: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

const Company = mongoose.model("company", companySchema);
export default Company;
