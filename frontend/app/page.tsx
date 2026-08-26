"use client";
import {useState,useEffect} from "react";
function Todo(){
  type Task={
  id: number;
  title: string;
  status: string;
}
  const [editStatus, setEditStatus]=useState<{[key:number]:string}>({})
  const [tasks, setTasks]=useState<Task[]>([])
  const [title, setTitle]= useState("")
  const [status, setStatus]=useState("todo")
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState("")
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
  async function addTask(){
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
        body: JSON.stringify({
          title: title,
          status: status
        })
      })
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
  async function updateTask(id:number){
  try{
    const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        status:editStatus[id]
      })
    })
    const data = await response.json()
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
async function deleteTask(id:number){
  try{
    const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "DELETE"
    });
 setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }catch(err){
    setError("unable to delete task");
  }
}
  useEffect(()=>{
    getTask()
  },[])
  return(
    <main>
      <h1>Todo App</h1>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <select value={status} onChange={(e)=>setStatus(e.target.value)}>
        <option value="todo">Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={addTask}>Add Task</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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