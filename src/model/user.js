import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true, default: true },
  created: { type: Date, default: () => new Date() }
});

const User = mongoose.model('user', userSchema);
export default User;
