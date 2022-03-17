import Jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"


class jwtAuth {
     isAdmin = async (req ,res , next)=>{
        try {
          if (req.isAuthenticated() && req.user.isAdmin){
           next()
          }else{
            res.redirect('/login')
          }
        } catch (error) {
          console.log(error)
          res.redirect('/login')
        }
       } 
     Tokenauth = async (req ,res , next)=>{
        try {
          const token = req.cookies.jwt_Token
          const verfiy =  Jwt.verify(token , 'mysupersecret')
          const verfified_user = await userModel.findById(verfiy._id)
          req.user = verfified_user ;
         next()
        } catch (error) {
          console.log(error)
          res.redirect('/login')
        }
       } 


       verifyOtp = async (req ,res , next)=>{
         const phone = req.body.username;
        try {
         const user =await userModel.findOne({phone : phone})
          if(user.otp_verified){
            next()
          }else{
            res.redirect('getotp')
          }
        } catch (error) {
          console.log(error)
          res.redirect('/login')
        }
       } 
}

export default jwtAuth