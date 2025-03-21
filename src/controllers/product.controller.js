import { trusted } from "mongoose";
import Product from "../models/product.model.js";





const getProduct = async(req,res)=>{
    try{
        const product = await Product.find();
        if(!product){
            return res.status(404).json({message:"Product Not found",error:error.message})
        }

        return res.status(200).json(product);
        
    }catch(error){
        return res.status(500).json({message:"Internal server error",error:error.message});
    }
}

const getProductById = async(req,res)=>{
    try{
        const  {id} = req.params;
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({message:"Product not found on the given id"});
        }
        return res.status(200).json({product});

    }catch(error){
        return res.status(500).json({message:"Internal server Error",error:error.message});
    }
}

const addProduct = async(req,res)=>{
    try{
        const{name,price,description,catagory,stock} = req.body
        const product = await Product.findOne({name});

        if(product){
            return res.status(401).json({message:"Product already exist"})
        }

        const newProduct = new Product({name,price,description,catagory,stock})
        newProduct.save();

        return res.status(200).json({message:"Product is succesfully Added", product:newProduct});

    }
    catch(error){
        return res.status(500).json({message:"Internal sever error",error:error.message})
    }
}


const updateProductById = async(req,res)=>{

    try{

        const {name,price,description,catagory,stock} = req.body;
         const noproduct = await Product.findOne({name});

         if(!noproduct){
            return res.status(404).json({message:"No Product found to update"});
         }
            const updateProduct =  await Product.findByIdAndUpdate(req.params.id,req.body,{new:trusted})

            return res.status(200).json({message:"Product succesfuly updated",product:updateProduct});
        }catch(error){

    }

}


const deleteProductById = async(req,res)=>{
    try{
        const deletedPro = await Product.findByIdAndDelete(req.params.id);
        if(!deletedPro){
            return res.status(404).json({message:"product not found to delete"});
        }
        
        return res.status(200).json({message:"Product successfully deleted",deletedPro});
    }catch(error){
        return res.status(500).json({message:"Internal server Error",error:error.message})
    }
}

export default 
        {
            addProduct,
            getProduct,
            getProductById,
            updateProductById,
            deleteProductById
        };