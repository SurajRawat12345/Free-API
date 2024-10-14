import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        default: 0,
    },
},{timestamps:true})

export default mongoose.model("products",productSchema);