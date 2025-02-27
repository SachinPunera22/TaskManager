const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true,select:false }, // Store hashed password
    email: { type: String, required: true, unique: true },

    role: {
      type: String,
      enum: ["Manager", "Team Lead", "Employee"],
      default:'Employee',
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
