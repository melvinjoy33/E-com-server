const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 8585;

//import routers
const userRoute = require('./routes/user');
const authUserRoute = require('./routes/auth');
app.use(express.json());
app.use(cors());

dotenv.config();


mongoose
  .connect(process.env.MONGO_URL_LIVE)
  .then(() => {
    console.log("db connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });


app.use('/api/user', userRoute);
app.use('/api/adduser', authUserRoute);


app.listen(port || 8585, () => console.log(`server is running in ${port}`));
