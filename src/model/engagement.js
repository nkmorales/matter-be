import mongoose from "mongoose";

const engagementSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    startup: { type: String, required: true },
    partner: { type: String, required: true },
    date: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

const engagement = mongoose.model("engagement", engagementSchema);
export default engagement;
