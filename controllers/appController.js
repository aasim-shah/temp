import userModel from "../models/userModel.js";
import  Jwt  from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt'
import axios  from 'axios';

import {transporter , generateOtp} from '../middlewares/nodemailer.js'
class apps {
     async   home(req ,res) {
       
      res.render('home' )
    }
    async  registering(req ,res) {
       const {username , email , password , phone} = req.body;
       let otp = generateOtp()
       let hash = await bcrypt.hash(password , 10)
         const data = new userModel({
             username ,
             email,
             phone,
             password : hash ,
             otp
         })       
         const registed = await data.save()
         const regtoken = await data.Authuser()
         if(registed){
          axios({
            url: "https://www.fast2sms.com/dev/bulkV2",
            method: "post",
            headers: {
              authorization:
                "UwizLrB0fQhFpNVtYdy8xH4oMmlbGDv91qakTIg25ZSsPWKCu6NaFrqQZl0WGMLHzPIRnctfDxvs5uk6"
            },
            data: {
              variables_values: otp,
              route: "otp",
              numbers: req.body.phone,
            }
          })
            .then(ee => {
              console.log(ee.data);
            })
            .catch(err => {
              console.log(err);
            });
            res.render('otp' , {phone : req.body.phone})
         }else{
             res.redirect('back')
         }
     }
     async  registered(req ,res) {
         res.render('register')
      }

      async  get_otp_get(req ,res) {
        res.render('getotp')
     }
      async  get_otp_post(req ,res) {
        const my_number = req.body.phone;
        console.log(my_number)
        let otp = generateOtp()
          axios({
            url: "https://www.fast2sms.com/dev/bulkV2",
            method: "post",
            headers: {
              authorization:
                "UwizLrB0fQhFpNVtYdy8xH4oMmlbGDv91qakTIg25ZSsPWKCu6NaFrqQZl0WGMLHzPIRnctfDxvs5uk6"
            },
            data: {
              variables_values: otp,
              route: "otp",
              numbers: my_number
            }
          })
            .then(ee => {
              console.log(ee.data);
            })
            .catch(err => {
              console.log(err);
            });
          console.log(otp);
          let save_otp = await userModel.findOneAndUpdate(
            { phone: my_number },
            {
              otp: otp
            }
          );
          if (save_otp) {
            res.render('otp' , {phone : req.body.phone})
          } else {
            res.send("filed to save otp");
          }        
     }

      async  verify_otp_get(req ,res) {
        res.render('otp' , {email : ""})
     }
     async  verify_otp_post(req ,res , next) {
     const otp = req.body.otp;
    const phone = req.body.phone;
        const user = await userModel.findOne({phone : phone});
        if(user.otp === otp){
            const updateUser = await userModel.findOneAndUpdate({phone} , {otp_verified : true})
            res.redirect('/login')
        }else{
            res.redirect('/register')
        }

    }

     async  login_post(req ,res) {
         const Token = await req.user.Authuser()
         res.cookie('jwt_Token' , Token )
             res.redirect('/')
     }
     async  login_get(req ,res) {
       res.render('login')
     }
 
     async  dashboard_get(req ,res) {
         res.send('dashboard')
    //    res.render('home')
     }



     async get_cart(req , res)  {
        res.render('cartpage' , {d : req.session.cart  ,  id : ''})
      }
  
    async post_addtocart(req ,res){
        console.log('post_addtoacrt')
        if(!req.session.cart){
          req.session.cart = {
            items : {},
            totalQty : 0,
            totalPrice : 0
          }
        }
        let cart = req.session.cart
      if(!cart.items[req.body._id]){
      cart.items[req.body._id] = {
        item : req.body,
        Qty : 1,
      }
        cart.totalQty = cart.totalQty + 1
      
      }else{
        cart.items[req.body._id].Qty = cart.items[req.body._id].Qty + 1
        cart.totalQty = cart.totalQty + 1
      }
      req.flash('info', 'Flash is back!')
      res.send({totalQty: req.session.cart.totalQty})
      
      }
 
     async  logout(req ,res) {
         res.clearCookie('jwt_Token')
         res.redirect('/login')
     }
     
}
export default apps