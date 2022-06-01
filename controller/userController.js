const User = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck) return res.json({ msg: "用户名已存在", status: false })
    const emailCheck = await User.findOne({ email })
    if (emailCheck) return res.json({ msg: "邮箱已被注册", status: false })
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    })
    delete user.password
    return res.json({ user, status: true })
  } catch (error) {
    next(error)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.json({ msg: "邮箱或密码不正确", status: false })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)
      return res.json({ msg: "邮箱或密码不正确", status: false })
    delete user.password
    return res.json({ user, status: true })
  } catch (error) {
    next(error)
  }
}

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id
    const avatarImage = req.body.image
    const user = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {
        new: true,
      }
    )
    return res.json({
      isSet: user.isAvatarImageSet,
      image: user.avatarImage,
    })
  } catch (error) {
    next(error)
  }
}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
}
