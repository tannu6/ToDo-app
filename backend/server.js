const express=require("express")
const mysql=require("mysql")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
// creating a connection to the mysql database
const db=mysql.createConnection({
  host:"localhost",
  password:"",
  user:"root",
  database:"todo"
})
// checking if the connection is done or not
db.connect((err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("connected successfully")
  }
})
// creating the api endpoints for the tasks
app.post("/api/tasks",(req,res)=>{
  const {title,status}=req.body
  // validating the title of the task before inserting it into the database
  if(!title||title.trim()=== ""){
    return res.send({ error: "Please enter task title" });
  }
  // inserting the task into the database
  db.query("INSERT INTO tasks(title,status) VALUES(?,?)",[title,status],(err,data)=>{
    if(err){
      console.log(err)
      return res.send({error:"something is wrong not able to add"})
    }
    else{
      // sending the response back to the frontend with the id of the newly inserted task
      res.json({id: data.insertId,title: title,status: status})
    }
})
})
// creating the api endpoint to get all the tasks from the database
app.get("/api/tasks",(req,res)=>{
  // querying the database to get all the tasks
  db.query("SELECT * FROM tasks",(err,data)=>{
    if(err){
      console.log(err)
      return res.send({error:"something is wrong not able to get data"})
    }
      else{
        // sending the response back to the frontend with the data of all the tasks
        res.send(data)
      }
    })
})
// creating the api endpoint to update the status of a task in the database
app.patch("/api/tasks/:id",(req,res)=>{
  const {id}=req.params
  const {status}=req.body
  // validating the status before updating it in the database
  db.query("UPDATE tasks SET status=? WHERE id=?",[status,id],(err,data)=>{
    if(err){
      console.log(err)
      return res.send({error:"something is wrong.. not able to update"})
    }
    else{
      // sending the response back to the frontend with the id and status of the updated task
      res.json({id:Number(id),status:status})
    }
})
})
// creating the api endpoint to delete a task from the database
app.delete("/api/tasks/:id",(req,res)=>{
  const {id}=req.params
  // deleting the task from the database
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
// starting the server on port 4000
app.listen(4000);