const express=require('express')
const router=express.Router();
const {getProducts,createProduct,deleteProduct,updateProduct,getProductsById} =require('../controllers/product.controller')

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductsById).put(updateProduct).delete(deleteProduct);

module.exports=router;