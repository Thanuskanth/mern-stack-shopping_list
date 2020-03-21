const express=require('express');
const router=express.Router();
const Item=require('../models/items')
const auth=require('../middleware/auth')
router.get('/',(req,res)=>{
    Item.find()
  
    .then(items=>res.json(items))


});
router.post('/add',auth,(req,res)=>{
    const item=new Item({
        name:req.body.name
    })
    item.save()
    .then(()=>res.json(item))


});
router.delete('/:id',auth,(req,res)=>{
   const user= Item.findByIdAndDelete(req.params.id)
    .then(()=>res.json(user))


});
module.exports=router;