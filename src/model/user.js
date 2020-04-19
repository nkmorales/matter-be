import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
