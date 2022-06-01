const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoutes = require("./router/userRouter")

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use("/api/user", userRoutes)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("数据库连接成功")
  })
  .catch((err) => {
    console.log(err)
  })

const server = app.listen(process.env.PORT, () => {
  console.log(`服务器在 ${process.env.PORT} 端口启动`)
})
