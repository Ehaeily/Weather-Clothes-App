const express=require("express");
const app=express();
const mongoose= require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoUrl ="mongodb+srv://dmsbyul0423:weatherAppPassword@cluster1.k7rrtcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

//integrate MongoDB
mongoose
.connect(mongoUrl)
.then(()=>{
    console.log("Database Connected");
})
.catch((e) =>{
    console.log(e);
});

require('./UserDetails')

const User=mongoose.model("UserInfo");

//first api
app.get("/" ,(req,res) =>{
    res.send({status: "Started"})
});

//create register API
app.post('/register',async(req,res) =>{
    const {name,email,password}=req.body;
    // const {name,email,password,location}=req.body;

    const oldUser = await User.findOne({email: email});

    if(oldUser){
        return res.send({data: "User already exist!"});
    }

    const encryptedPassword = await bcrypt.hash(password,10);

    try {
        await User.create({
            name: name,
            email: email,
            password: encryptedPassword, 
            // location,
        });
        res.send({status:"ok",data:"User Created"});
    } catch (error){
        res.send({status:"error",data: error});
    }
});

//login authentication
app.post("/login-user", async(req,res) =>{
    const {email,password} = req.body;
    console.log(req.body);
    const oldUser = await User.findOne({email: email});

    if(!oldUser){
        return res.send({data: "User doesn't exists"});
    }

    if(await bcrypt.compare(password,oldUser.password)){
        const token = jwt.sign({email: oldUser.email}, JWT_SECRET);

        if(res.status(201)){
            return res.send({
                status: "ok",
                 data: token});
        } else {
            return res.send({error: "error"});
        }
    }
});

//get user data
app.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const useremail = user.email;
  
      User.findOne({ email: useremail }).then((data) => {
        return res.send({ status: "Ok", data: data });
      });
    } catch (error) {
      return res.send({ error: error });
    }
  });

app.listen(8082,()=>{
    console.log("Node js server started.");
});