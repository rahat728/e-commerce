import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";
const listProducts = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({success: true, products});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Images from multer
        const image1 = req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files.image4 ? req.files.image4[0] : null;

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined && item !== null);
        
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                  console.log('Cloudinary upload result:', result);
                    return result.secure_url;
                    
                } catch (err) {
                  console.log('Cloudinary upload error:', err);
                    return null;
                }
            })
        )

        const productData = {
            name, 
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true: false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now() 
        };

        console.log('productData:', productData);

        const product = new productModel(productData);
        try {
            const savedProduct = await product.save();
            console.log('Saved product:', savedProduct);
            res.json({success: true, message: "Product added"});
        } catch (err) {
            console.log('Mongoose save error:', err);
            res.json({success: false, message: err.message});
        }





    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
const removeProduct = async (req,res) =>{

    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product removed"})
        
        } catch (error) {
            res.json({success: false, message: error.message})
        }
    

}

const singleProduct = async (req,res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success: true, product})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}



export {listProducts, addProduct, removeProduct, singleProduct}