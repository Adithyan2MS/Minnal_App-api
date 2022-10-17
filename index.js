import express from "express"

const app = express()

app.use(express.json())


app.get('/date', function (req, res) {
  let date = new Date().toISOString().slice(0,10)
  res.status(200).json(date)
  })


app.listen(8000,()=>{
    console.log("Connected at port 8000");
})