import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
