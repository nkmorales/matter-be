import mongoose from "mongoose";

const testEngagementSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    startup: { type: String, required: true },
    partner: { type: String, required: true },
    date: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

const testEngagement = mongoose.model("engagement", testEngagementSchema);
export default testEngagement;
