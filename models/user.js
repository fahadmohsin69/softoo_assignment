import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  user_Id: {type: Number},
  name: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  timestamp: { type: Date, required: true, default: Date.now() },
});

export default mongoose.model("User", userSchema);