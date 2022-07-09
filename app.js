//jshint esversion:6
require('dotenv').config()
const encryption=require("mongoose-encryption")
const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

mongoose.connect("mongodb://127.0.0.1:27017/userDB",{useNewUrlParser:true})

const userSchema= new mongoose.Schema({email:String,password:String})


userSchema.plugin(encryption,{secret:process.env.SECRET,encryptedFields:["password"]})



const User= mongoose.model("User",userSchema)





app.get("/",(req,res)=>
res.render("home.ejs")
);

app.get("/login",(req,res)=>
res.render("login.ejs")
);
app.get("/register",(req,res)=>

res.render("register.ejs")

);
app.post("/register",(req,res)=>{
const newUser = new User({email:req.body.username,password:req.body.password})

newUser.save(function(err){
if(err){
console.log(err)
}else{
  res.render("secrets")}
});
});

app.post("/login",function(req,res){
const username=req.body.email
const password=req.body.password

User.findOne({username},function(error,result){
if(error){
  console.log(error);
}else {
if(result){
  if(result.password===password){

  res.render("secrets");
}else{

  res.redirect("register");
}
}}})







})





app.listen(3000 ,()=>console.log("server awaits at port 3000"));
