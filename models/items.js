const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const itemSchema=new Schema({
    name:{ type:String,required:true},
    date:{default:Date.now,
    type:Date}
});
module.exports=Items=mongoose.model('Items',itemSchema)