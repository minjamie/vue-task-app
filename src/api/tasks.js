// src/api/tasks.js
import axios from 'axios'

const API_URL = 'http://localhost:8000/tasks' // Laravel API 주소
export const getTasks = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task)
  return response.data
}

export const completeTask = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}`, { completed: true })
  return response.data
}

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`)
}
