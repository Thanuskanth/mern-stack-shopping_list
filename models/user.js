const mongoose = require('mongoose');
const schema=mongoose.Schema;

const newUser=new schema ({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    date:{default:Date.now,type:Date}
});

module.exports=User=mongoose.model('ShopingUser',newUser);