const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const path =require('path');
const config=require('config');
const uri=config.get('ATLAS_URI');
const app=express();
app.use(express.json());
app.use(cors());
const port= process.env.port || 5000;
const itemRouter=require('./route/link');
const userRouter=require('./route/userroute');
const authRouter=require('./route/auth');
app.use('/items', itemRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        req.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

mongoose.connect(uri).then(()=>console.log('server connected')).catch(err=>res.status(400).json(err))


app.listen(port,()=>console.log('server started in port '))