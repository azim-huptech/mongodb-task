const mongoose=require('mongoose')

const productSchema=new mongoose.Schema(
    {
        sku:{
            type:String,
            required:[true,'SKU is required'],
            unique:true,
            trim:true,
            uppercase:true
        },
        name:{
            type:String,
            required:[true,'Product name is required'],
            trim:true
        },
        category:{
            type:String,
            required:[true,'Category is required'],
            index:true // for faster category filtering
        },
        price:{
            type:Number,
            required:[true,'Price is required'],
            min: [0,'Price cannot be negative']
        },
        inStock:{
            type:Boolean,
            default:true
        }
    },
    {timestamps:true}
);

productSchema.index({category:1,price:-1});

module.exports=mongoose.model('Product',productSchema);