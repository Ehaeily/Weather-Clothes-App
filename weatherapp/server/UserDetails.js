const mongoose=require("mongoose");

const UserDtailSchema =new mongoose.Schema({
    name: String,
    email:{ type: String, unique: true},
    password: String,
    // location: String,
},{
    collection: "UserInfo"
});
mongoose.model("UserInfo",UserDtailSchema);