import { Task, TaskInfo, MetaResponse, Filter } from '../types/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://easydev.club/api/v1/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchTasks(
  key: Filter,
): Promise<MetaResponse<Task, TaskInfo>> {
  try {
    const response = await api.get('', {
      params: { filter: key },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createUserTask(title: string): Promise<string | Task> {
  try {
    const response = await api.post('', {
      title,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserTask(id: number, title: string): Promise<Task> {
  try {
    const response = await api.put(`/${id}`, { title: title });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserStatusTask(
  id: number,
  isDone: boolean,
): Promise<Task> {
  try {
    const response = await api.put(`/${id}`, { isDone: isDone });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserTask(id: number) {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
}
