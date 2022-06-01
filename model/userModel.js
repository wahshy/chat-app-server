const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 3,
    max: 15,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    required: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
})

module.exports = mongoose.model("User", userSchema)
