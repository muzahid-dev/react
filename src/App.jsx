import React from 'react'
import { useEffect } from 'react'

export default function App() {
  const [todos, setTodos] = React.useState([])
  const [newTask, setNewTask] = React.useState('')

    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const response = await fetch(
            "https://solid-parakeet-g4wx9r64pj4jfvq6q-3001.app.github.dev/todos"
          );

          if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
          }

        const data = await response.json();
        setTodos(data);
        console.log("Todos fetched successfully:", data);
        } catch (error) {
          console.log("Error fetching todos:", error);
        }
      };

      fetchTodos();
    }, []);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  }

  const handleAddTask = () =>{
    if (newTask.trim() !== '') {
      setTodos([...todos, newTask.trim()]);
      setNewTask('');
    }
  }

  const handleDeleteTask =(index) =>{
    setTodos(todos.filter((_, i) => i !== index));
  }
  
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1>Welcome to ToDo App</h1>

      <input type="text" placeholder="Add a new task" value={newTask} onChange={(e) => handleChange(e)}/>
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.title ? todo.title : todo}
            <button style={{ marginLeft: 20 }} onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
