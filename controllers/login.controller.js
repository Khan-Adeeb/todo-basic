
const {UserModel} = require("./database/db")
var jwt = require('jsonwebtoken'); 
const bcrypt = require("bcrypt")
const { z } = require("zod");

require('dotenv').config()


const signupController = async (req , res) => {

    const myschema = z.object({
       email: z.string().trim().toLowerCase().email(),
        password: z
            .string()
            .min(3)
            .max(100)
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[!@#$%^*_]/, { message: "Password must include at least one special character (!@#$%^*_)" })
            .regex(/^\S+$/, "Password cannot contain spaces"),
        name: z.string().regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
    })

    const parseddata = myschema.safe.Parse(req.body)

    if(!parseddata.success){
        res.json({
            msg: "incorrect format",
            err: parseddata.error
        })
        return;
    }


    const email = req.body.email ; 
    const password = req.body.password ;
    const name = req.body.name ; 


    try {
        const hashedpassword = await bcrypt.hash(password , 3); 

        await UserModel.create({
            email : email,
            password : hashedpassword,
            name : name
        })
        res.status(200).json({
            msg : "successfully signed up!"
        })

    } catch (error) {
        res.json({
            mes: "already signed in!"
        })
    }

}


const signinController = async (req, res) => {
    const email = req.body.email ; 
    const password = req.body.password ;
    

    let user = await UserModel.findOne({
        email  : email ,
    })

    const passMatch = await bcrypt.compare(password , user.password)

    if(user && passMatch){
        const userID = user._id.toString()
        
        let token = jwt.sign({
            id : userID
        }, process.env.JWT_SECRET);

        res.json({
            msg : "sucessfully signed in",
            token: token
        })
    }else{
        res.status(403).json({
            msg : "Username or password is incorrect"
        })
    }

}

module.exports = {signinController , signupController};