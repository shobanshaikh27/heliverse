const fs = require('fs')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Users = require('./models/Users')
const user = require('./routes/users')
const { getAllUsers } = require('./controllers/user')
dotenv.config({ path: 'config.env' })

const mongoURI = process.env.MONGODB_URL

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.json())

app.use("/api/users",user);
// connect to mongodb
mongoose.connect(mongoURI).then(() => console.log('db connected'))



const data = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))



// import data to MongoDB
const importData = async () => {
  try {
    await Users.create(data)
    console.log('data successfully imported')
    // to exit the process
    process.exit()
  } catch (error) {
    console.log('error', error)
  }
}





const PORT = 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))