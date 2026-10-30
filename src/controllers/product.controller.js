const Product=require('../models/Product');

const getProducts=async(req,res,next)=>{
    try{
        const {category,minPrice,maxPrice}=req.query;
        const filter={};

        if(category) filter.category=category;
        if(minPrice || maxPrice){
            filter.price={};
            if(minPrice) filter.price.$gte=Number(minPrice);
            if(maxPrice) filter.price.$lte=Number(maxPrice);
        }

        const products=await Product.find(filter).sort({price:-1});
        res.status(200).json({success:true,count:products.length,data:products});
    }catch(err){
        next(err);
    }
};


const getProductsById=async (req,res,next)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            const error=new Error('Product not found')
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({success:true,data:product});
    }catch(err){
        next(err);
    }
};

const createProduct=async (req,res,next)=>{
    try{
        const product=await Product.create(req.body);
        res.status(201).json({success:true,data:product});
    }catch(err){
        if(err.code===11000){
            err.statusCode=400;
            err.message=`Duplicate value :${Object.keys(err.keyValue)[0]} must be unique`;
        }
        
        if(err.name==='ValidationError'){
            err.statusCode=400;
            err.message=Object.values(err.errors).map((val)=>val.message).join(', ');
        }
        next(err);
    }
};


const updateProduct = async(req,res,next)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if(!product){
            const error=new Error('Product not found');
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({success:true,data:product});
    }catch(err){
        next(err);
    }
};

const deleteProduct = async(req,res,next)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product){
            const error=new Error('Product not found');
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({success:true,message:'Product deleted successfully'});
    }catch(err){
        next(err);
    }
};

module.exports={
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
};



