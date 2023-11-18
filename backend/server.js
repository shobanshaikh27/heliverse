const fs = require('fs')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Users = require('./models/Users.js')
const user = require('./routes/users.js')
const teams = require('./routes/teams.js')

dotenv.config({ path: 'config.env' })

const mongoURI = process.env.MONGODB_URL

const app = express()

app.use(express.json());
app.use(cors());
app.use("/api/users", user);
app.use("/api/team", teams);



// connect to mongodb
mongoose.connect(mongoURI).then(() => console.log('db connected'))



const data = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))



// import data to MongoDB
const importData = async () => {
  try {
    await Users.deleteMany()
    await Users.create(data)
    console.log('data successfully imported')
    // to exit the process
  } catch (error) {
    console.log('error', error)
  }
}

// importData();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))