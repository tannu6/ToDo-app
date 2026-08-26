"use client";
import {useState,useEffect} from "react";
function Todo(){
  type Task={
  id: number;
  title: string;
  status: string;
}
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("todo")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  async function getTask(){
    setLoading(true)
    try {
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
    try {
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
  useEffect(()=>{
    getTask()
  },[])
  return(
    <main>
      <h1>Todo App</h1>
      <input
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <select
        value={status}
        onChange={(e)=>setStatus(e.target.value)}>
        <option value="todo">Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={addTask}>Add Task</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {tasks.map((task)=>(
          <li key={task.id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </main>
  )
}
export default Todo;