import express from "express"
import {getUsers,doLogin,doSignup} from "../controllers/controller.js"

const router = express.Router()

router.get("/users",getUsers)
router.get("/date",(req,res)=>{
    const cdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    res.json(cdate)
})

router.post("/signup",doSignup)
router.post("/login",doLogin)



export default router