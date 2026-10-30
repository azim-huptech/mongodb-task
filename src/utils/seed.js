require('dotenv').config();
const mongoose=require('mongoose');
const Product=require('../models/Product');

const categories=['Electronics','Clothing','Books','Home&Kitchen','Sports'];

const generateSeedData=()=>{
    const products=[];
    for(let i=1;i<=50;i++){
        const category=categories[i%categories.length];
        products.push({
            sku:`PROD-${1000+i}`,
            name:`${category} Item ${i}`,
            category: category,
            price:Math.floor(Math.random()*500)+10,
            inStock: i%5!==0
        });
    }
    return products;
};


const seedDatabase=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to atlas for seeding");

        await Product.deleteMany({});   
        console.log('cleared existing products');

        const seedData=generateSeedData();
        await Product.insertMany(seedData);
        console.log("Products seeded successfully");

        process.exit(0);
    }catch(error){
        console.error('Seeding failed',error);
        process.exit(1);
    }
};

seedDatabase();