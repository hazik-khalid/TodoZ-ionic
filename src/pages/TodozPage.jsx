import React, { useState, useEffect } from 'react';
import './todoz.css'; // Import your CSS file

function TodozPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('todo-tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage on any change
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
    <div className='todolist'>
      <div>
        <input
          type="text"
          placeholder='Enter a task....'
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={addTask} className='add-btn'>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className='text'>{task}</span>
            <button onClick={() => deleteTask(index)} className='delete-btn'>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
    </>
  );
}

export default TodozPage;
