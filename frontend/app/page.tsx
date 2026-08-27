"use client";
//importing react hooks
import {useState,useEffect} from "react";
function Todo(){
  type Task={
  id: number;
  title: string;
  status: string;
}
//initializing states
  const [editStatus, setEditStatus]=useState<{[key:number]:string}>({})
  const [tasks, setTasks]=useState<Task[]>([])
  const [title, setTitle]= useState("")
  const [status, setStatus]=useState("todo")
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState("")
  //getTask() is the function to fetch the data from the backend
  async function getTask(){
    setLoading(true)
    try{
      const response = await fetch("http://localhost:4000/api/tasks");
      const data = await response.json();
      setTasks(data);
    }
    catch(err){
      setError('unable to load data');
    }
    setLoading(false);
  }
  //addTask() is the function to add a new task to the backend
  async function addTask(){
    //checking if the title is empty or not
    if(!title.trim()){
      setError("Please enter task");
      return;
    }
    try{
      const response = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //sending the title and status to the backend
        body: JSON.stringify({
          title: title,
          status: status
        })
      })
      //getting the response from the backend and adding it to the tasks.
      const data = await response.json();
      setTasks([...tasks, data]);
      setTitle("");
      setStatus("todo");
      setError("");
    }
    catch(err){
      setError("unable to add task");
    }
  }
  //this is the function to update the task status in the backend
  async function updateTask(id:number){
  try{
    const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method:"PATCH",//patch method is used to update the data in the backend
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        status:editStatus[id]
      })
    })
    const data = await response.json()
    //updating the task status in the frontend
    setTasks((tasks)=>
      tasks.map((task)=>
        task.id === id?{...task,status:data.status}:task
      ))
    setError("")
  }
  catch(err){
    setError("unable to update task")
  }
}
//this is the function to delete the task from the backend
async function deleteTask(id:number){
  try{
    const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "DELETE"
    });
    //updating the tasks in the frontend after deleting the task from the backend
 setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }catch(err){
    setError("unable to delete task");
  }
}
//useEffect is used to call the getTask() function when the component is rendered for the first time.
  useEffect(()=>{
    getTask()
  },[])
  return(
    <main>
      <h1>Todo App</h1>
      {/* this is the task input field */}
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <select value={status} onChange={(e)=>setStatus(e.target.value)}>
        <option value="todo">Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={addTask}>Add Task</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* we are displaying the tasks in a table format with the option to update the status and delete the task. */}
      <table border={1}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Task</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {/* mapping through each task and displaying it in a table row */}
    {tasks.map((task) => (
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td>
        <select value={editStatus[task.id] || task.status}onChange={(e)=>setEditStatus({...editStatus,[task.id]: e.target.value
            })}>
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </td>
      <td>
        <button onClick={()=>updateTask(task.id)}>Update</button>
        ||<button onClick={()=>deleteTask(task.id)}>Delete</button>
      </td>
</tr>
    ))}
  </tbody>
</table>
    </main>
  )
}
export default Todo;