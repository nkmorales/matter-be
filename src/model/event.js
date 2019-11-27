import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    companies_registered: [
      { type: mongoose.Schema.Types.ObjectId, ref: "company" }
    ],
    companies_checked_in: [
      { type: mongoose.Schema.Types.ObjectId, ref: "company" }
    ],
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);
export default Event;
