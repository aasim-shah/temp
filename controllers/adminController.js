import userModel from '../models/userModel.js'
class AdminController {
    home(req , res){
       res.render('admin/home')
    }

   async add_product_get(req , res){
        res.render('admin/add_product')
    }

   async add_product_post(req , res){
        const {name , price , desc , category} = req.body;
        const product_data = new productModel({
            name ,
            price , 
            desc ,
            category,
            thumbnail :'images/'+req.file.filename
        })

        const added = await product_data.save()
        res.redirect('back')
    }
   
}
export default AdminController