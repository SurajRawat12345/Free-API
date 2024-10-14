import dotenv from "dotenv";
dotenv.config();
import productModel from "../models/productModel.js";

// To add new product
export const addProduct = async(req,res) => {
    try {
        const { title, price, description, category, image } = req.body;
        if(!title || !image || !price || !description || !category ){
            res.status(409).send({ msg : "Enter all fields"})
        }
        const newProduct = await productModel({
            title,
            price,
            category,
            description,
            image,
        }).save()
        res.status(200).send({ 
            success : true,
            msg : "Product Created Successfully",
            newProduct,
        });
    } catch (err) {
        //console.log(err);
        res.status(500).send({ 
            success : false,
            msg : "Product Not Added Successfully",
            err,
        });
    }
};

// To get all latest products
export const getAllController = async(req,res) => {
    try{
        // const perPage = 8;
        // const page = req.params.page ? (req.params.page) : (1);
        const products = await productModel.find({}).sort({createdAt: -1});
        // .limit(perPage*page)
        
        res.status(200).send({
            success: true,
            msg: "Fetched all Products",
            products,
        })
    }
    catch(error){
        //console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error while loading Products",
            error,
        })   
    }
}; 

// To delete product
export const deleteProductController = async(req,res) => {
    try{
        const {id} = req.params;
        const deletedProduct = await productModel.findByIdAndDelete({_id:id});
        if (!deletedProduct) {
            return res.status(404).send({
                success: false,
                msg: "Product not found",
            });
        }
        res.status(200).send({
            success: true,
            msg: "Product Deleted Successfully",
            deletedProduct, 
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error in deleting product",
            error,
        })
    }
};  

// To get single product details
export const getProductByIdController = async(req,res) => {
    try{
        const {id} = req.params;
        const product = await productModel.find({_id : id});
        res.status(200).send({
            success: true,
            msg: "Fetched single product",
            product,
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            msg: "Error in getting specific Pet",
            error, 
        })
    }
};

// Update product Controller
export const updateProductController = async(req,res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,  
            updatedData,  
            { new: true, runValidators: true }  
        );
        if (!updatedProduct) {
            return res.status(404).send({
                success: false,
                msg: "Product not found",
            });
        }
        res.status(200).send({
            success: true,
            msg: "Product updated successfully",
            updatedProduct, 
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({
            success: false,
            msg: "Error in updating product",
            error: error.message, 
        });
    }  
};

// Search product Controller
export const searchProductController = async(req,res) => {
    try{
        const { keyword } = req.params;
        const results = await productModel.find({
            $or:[
                {title: { $regex : keyword , $options : 'i'}},
                {category : { $regex : keyword , $options : 'i'}} 
            ],
        })
        res.status(200).send({
            success: true,
            msg : "Searched Products",
            results,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success : false,
            msg: "Error in Searching",
            err,
        })
    }
};