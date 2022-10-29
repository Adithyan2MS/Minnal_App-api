import express from "express"
import apiRoutes from "./routes/api.js"
import bodyParser from "body-parser"

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/api",apiRoutes)

app.use(function(err,req,res,next){
  res.status(422).send({error: err.message})
})

app.listen(8000,()=>{
    console.log("Connected..Waiting for Request");
})