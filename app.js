const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require('mongoose');
const pathconnect = process.env.connect;
const dbconnection = () => {
     mongoose.connect(pathconnect);
}


const userRouter = require('./routes/userRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/user", userRouter);


app.get('/', (req, res) =>{
     res.send(`Welcome to KFC Cloned`);
});


app.listen(PORT, async()=>{
     try{
          await dbconnection();
          console.log(`Listening to the Port ${PORT} & connected to DB Successfully`);
     } catch(error){
          console.error("Error connecting to MongoDB:", error);
     }
});


