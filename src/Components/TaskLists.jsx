import React, { useState, useEffect } from 'react';
import { addTask, deleteTask, getTasks, updateTask, updateTaskStatus } from '../services/taskServices'; // updated import
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      await addTask({ title: newTask });
      setNewTask('');
      loadTasks();
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleUpdate = async (id, updatedData) => {
    await updateTask(id, updatedData);
    setEditTaskId(null);
    loadTasks();
  };

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    setEditTaskTitle(task.title);
  };

  // Separate tasks into pending and completed
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  // Toggle task status between pending and completed
  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    await updateTaskStatus(task._id, newStatus);
    loadTasks(); // Reload tasks after status change
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl mb-8 font-bold text-blue-700">Task Manager</h1>

      {/* Task Input Section */}
      <div className="flex flex-wrap gap-3 mb-8 w-full max-w-lg">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow min-w-0 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={handleAddTask} 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition duration-200"
        >
          Add Task
        </button>
      </div>

      {/* Pending Tasks Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pending Tasks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {pendingTasks.map(task => (
            <div 
              key={task._id} 
              className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between border border-gray-200 transition-transform transform hover:-translate-y-1"
            >
              {editTaskId === task._id ? (
                <input
                  type="text"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                  className="px-2 py-1 border rounded-lg mb-4"
                />
              ) : (
                <div className="text-lg font-semibold break-words mb-4">{task.title}</div>
              )}
              
              <div className="flex justify-between items-center space-x-4">
                <FaCheckCircle
                  className="text-green-500 hover:text-green-700 cursor-pointer text-xl transition-colors"
                  onClick={() => toggleTaskStatus(task)}
                />
                
                {editTaskId === task._id ? (
                  <button
                    onClick={() => handleUpdate(task._id, { title: editTaskTitle })}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Save
                  </button>
                ) : (
                  <FaEdit 
                    className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl transition-colors"
                    onClick={() => handleEditClick(task)}
                  />
                )}

                <FaTrash 
                  className="text-red-500 hover:text-red-700 cursor-pointer text-xl transition-colors"
                  onClick={() => handleDelete(task._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Tasks Section */}
      <div className="w-full max-w-4xl mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Completed Tasks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {completedTasks.map(task => (
            <div 
              key={task._id} 
              className="p-6 bg-green-100 rounded-lg shadow-lg flex flex-col justify-between border border-green-300 transition-transform transform hover:-translate-y-1"
            >
              <div className="text-lg font-semibold break-words mb-4">{task.title}</div>
              
              <div className="flex justify-between items-center space-x-4">
                <FaCheckCircle
                  className="text-green-500 hover:text-green-700 cursor-pointer text-xl transition-colors"
                  onClick={() => toggleTaskStatus(task)}
                />
                <FaEdit 
                  className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl transition-colors"
                  onClick={() => handleEditClick(task)}
                />
                <FaTrash 
                  className="text-red-500 hover:text-red-700 cursor-pointer text-xl transition-colors"
                  onClick={() => handleDelete(task._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
