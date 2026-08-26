const express=require("express")
const mysql=require("mysql")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
const db=mysql.createConnection({
  host:"localhost",
  password:"",
  user:"root",
  database:"todo"
})
db.connect((err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("connected successfully")
  }
})
app.post("/api/tasks",(req,res)=>{
  const {title,status}=req.body
  if(!title||title.trim()=== ""){
    return res.send({ error: "Please enter task title" });
  }
  db.query("INSERT INTO tasks(title,status) VALUES(?,?)",[title,status],(err,data)=>{
    if(err){
      console.log(err)
      return res.send({error:"something is wrong not able to add"})
    }
    else{
      res.json({id: data.insertId,title: title,status: status})
    }
})
})
app.get("/api/tasks",(req,res)=>{
  db.query("SELECT * FROM tasks",(err,data)=>{
    if(err){
      console.log(err)
      return res.send({error:"something is wrong not able to get data"})
    }
      else{
        res.send(data)
      }
    })
})
app.patch("/api/tasks/:id",(req,res)=>{
  const {id}=req.params
  const {status}=req.body
  db.query("UPDATE tasks SET status=? WHERE id=?",[status,id],(err,data)=>{
    if(err){
      console.log(err)
      return res.send({error:"something is wrong.. not able to update"})
    }
    else{
      res.json({id:Number(id),status:status})
    }
})
})
app.delete("/api/tasks/:id",(req,res)=>{
  const {id}=req.params
  db.query("DELETE FROM tasks WHERE id=?",[id],(err,data)=>{
    if(err){
      console.log(err)
      return res.send({error:"something is wrong not able to delete"})
    }
    else{
      res.send(data)
    }
})
})
app.listen(4000);