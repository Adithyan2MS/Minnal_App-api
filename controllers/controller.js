import {db} from "../db.js"
import bcrypt from "bcrypt"


export const getUsers = (req,res)=>{
    const q = "SELECT * FROM users"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data)
        console.log(data);
    })
}
export const doSignup = (req,res)=>{
    //check existing user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exist")

        //Hash Password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const q = "INSERT INTO users(`username`,`email`,`password`,`created_at`,`updated_at`) VALUES (?)"
        const cdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const values = [
            req.body.username,
            req.body.email,
            hash,
            cdate,
            cdate
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json("User has been created.")
            console.log(data)
        })

    })
}
export const doLogin = (req,res)=>{
    //check User
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err)
        else{
            if(data.length==0) return res.status(404).json("User not Found!")
            //check password
            const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password)
            if(!isPasswordCorrect) return res.status(400).json("Wrong Username or Password.")
            else return res.json("User Logged In")
        }
    })
}