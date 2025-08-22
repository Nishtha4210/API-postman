const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.UserRegister = async (req, res) => {
    try{
        console.log(req.body);
        let existEmail = await User.findOne({ email : req.body.email })
        if(!existEmail){
            if(req.body.password == req.body.confirm_password){
                req.body.password = await bcrypt.hash(req.body.password,10);
                req.body.confirm_password = await bcrypt.hash(req.body.confirm_password,10);
                let regiUser = await User.create(req.body);
                if(regiUser){
                    return res.status(200).json({"msg": "User Register Successfully...."});
                }
                else{
                    return res.status(400).json({"msg": "Failed to Register User.."});
                }
            }
            else{
                return res.status(400).json({"msg": "Password & Confirm Password not Match...."});
            }
        }   
        else{
            return res.status(400).json({"msg": "Email Id is Already Exist...."});
        }     
        
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong.."});
    }
}

module.exports.userLogin = async (req, res) => {
    try{
        let existEmail = await User.findOne({ email : req.body.email });
        if(existEmail){
            if(await bcrypt.compare(req.body.password, existEmail.password)){
                let token = jwt.sign({userData : existEmail},'ram-secret',{expiresIn : '1h'});
                return res.status(200).json({msg: "Login Successfully...", token : token});
            }
            else{
                return res.status(400).json({"msg": "Invalid Password..."});
            }
        }
        else{
            return res.status(400).json({"msg": "Invalid Email ID..."});
        }
    }catch(err){
        return res.status(400).json({"msg": "Something Wrong..."});
    }
}