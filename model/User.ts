import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    role: { type: String, enum: ["employee"] },
    isDeleted: Boolean,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
