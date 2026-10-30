const express=require('express');
const productRoutes=require('./routes/product.routes');

const app=express();

app.use(express.json());
app.use('/api/products',productRoutes);

app.use((req,res,next)=>{
    const error=new Error(`Cannot find route ${req.originalUrl} on this server`);
    error.statusCode=404;
    next(error);
});

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||(err.name==='CastError'?400:500);
    const message=err.name==='CastError'?'Invalid MongoDB ObjectID format':err.message;
    res.status(statusCode).json({
        success:false,
        status:statusCode,
        message:message||'Internal Server Error'
    });

});

module.exports=app;
