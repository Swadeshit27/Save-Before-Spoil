import express from "express";
import cors from "cors" 
import mongoose from "mongoose";
import dotenv from "dotenv";  
const port = process.env.PORT || 8000; 

/***********************  Import Router *************************************/ 
import userAuth from './Router/UserAuth.js' 

/*****************  Configurations or middleware **************************/
dotenv.config();
const app = express();
app.use(express.json());    
app.use(cors()); 


/*****************  route with file **************************/ 
app.use("/auth", userAuth);

/*****************  Database connection  **************************/
mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => {
        console.log("connected with mongodb atlas");
    })
    .catch((err) => console.log("no connection"));

app.listen(port, () => console.log(`server listening at the port no ${port}`));