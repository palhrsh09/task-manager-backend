import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Get all tasks
export const getTasks = async () => {
  return await axios.get(API_URL);
};

// Create a new task
export const addTask = async (task) => {
  return await axios.post(API_URL, task);
};

// Update a task
export const updateTask = async (id, task) => {
  return await axios.put(`${API_URL}/${id}`, task);
};

// Delete a task
export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};


export const updateTaskStatus = (id, status) => {
    return axios.put(`${API_URL}/${id}/status`, { status });
  };