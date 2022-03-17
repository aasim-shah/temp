import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/sumit2').then((done) => {
    console.log('connected')
}).catch((e) =>{
    console.log(e)
})


export default mongoose