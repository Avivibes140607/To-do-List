import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [task, setTask] = useState("");//input Box values
  const [tasks, setTasks] = useState([]); //List of all tasks

  // load tasks from localstorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks){
      setTasks(savedTasks);
    }
    }, []);

    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
  const handleAddTask = () => {
    if (task.trim() !== "") {
      const newTask = { text: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask(""); //input box clear after adding
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTasks(updatedTasks);
  }
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>To-do-List</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
        style={{ padding: "8px", width: "250px" }}
      />

      <button
        onClick={handleAddTask}
        style={{ padding: "8px 16px", marginLeft: "10px", cursor: "pointer" }}>

        Add task
      </button>

      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {tasks.map((item, index) => (
          <li key={index}
            onClick={() => toggleComplete(index)}
            style={{
              marginBottom: "10px",
              cursor: "pointer",
              textDecoration: item.completed ? "line-through" : "none",
              color: item.completed ? "gray" : "black",
            }}>{item.text}
            <button
              onClick={(e) => {
                e.stopPropagation(); //stop from triggering toggle
                handleDeleteTask(index)
              }}
              style={{ marginLeft: "10px", 
              color: "white", 
              backgroundColor: "Red",
              border: "none", 
              padding: "4px 8px ", 
              cursor: "pointer" 
              }}
              >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
