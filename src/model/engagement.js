import mongoose from "mongoose";

const engagementSchema = mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    startup: { type: String, required: true },
    activity_type: { type: String, required: true },
    partner: { type: String, required: false },
    date: { type: Date, required: false },
    active: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

const engagement = mongoose.model("engagement", engagementSchema);
export default engagement;
