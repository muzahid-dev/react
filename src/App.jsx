import React from 'react'
import { useEffect } from 'react'

export default function App() {
  const [todos, setTodos] = React.useState([])
  const [newTask, setNewTask] = React.useState('')

    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const response = await fetch(
            `https://solid-parakeet-g4wx9r64pj4jfvq6q-3001.app.github.dev/todos`
          );

          if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
          }

        const data = await response.json();
        setTodos(data);
        console.log("Todos fetched successfully:", data);
        } catch (error) {
          console.log("Error fetching todos:", error);
          alert("Failed to fetch todos. Please try again later.");
        }
      };

      fetchTodos();
    }, []);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  }

  const handleAddTask = () =>{
    if (newTask.trim() !== '') {

        const addTask = async () => {
          try {
            const response = await fetch(
              `https://solid-parakeet-g4wx9r64pj4jfvq6q-3001.app.github.dev/todos`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTask.trim(), completed: false }),
              } 
            );  
            if (!response.ok) {
              console.log(`HTTP error! status: ${response.status}`);
              return;
            }
            const data = await response.json();
            setTodos([...todos, data]);
            setNewTask('');
            console.log("Task added successfully:", data);
          } catch (error) {
            console.log("Error adding task:", error);
            alert("Failed to add task. Please try again later.");
          }
        }

    addTask();
    }
  }

  const handleDeleteTask = async(id) =>{
    try {
      const response = await fetch(
        `https://solid-parakeet-g4wx9r64pj4jfvq6q-3001.app.github.dev/todos/${id}`,
        {
          method: 'DELETE',
        }
      );
      alert("Task deleted successfully.");
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        return;
      }

      setTodos(todos.filter(todo => todo.id !== id));
      console.log(`Task with ID ${id} deleted successfully.`);
    } catch (error) {
      console.log("Error deleting task:", error);
      alert("Failed to delete task. Please try again later.");
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1>Welcome to ToDo App</h1>

      <input type="text" placeholder="Add a new task" value={newTask} onChange={(e) => handleChange(e)}/>
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {todos.map((todo, index) => (
          <li className="todo-item" key={index}>
            {todo.title ? todo.title : todo}
            <span >
              <button className='todo-btn' onClick={() => handleDeleteTask(todo.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
