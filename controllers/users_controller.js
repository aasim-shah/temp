import userModel from "../models/userModel.js";
import  Jwt  from 'jsonwebtoken';
import cookieParser from "cookie-parser";


export default function users() {
    return ({
      home(req , res){
        res.send('users route')
    }

    
    })
}

