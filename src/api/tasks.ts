import { Task, TaskInfo, MetaResponse, TaskFilter } from '../types/types';
import { API } from './http';

export async function fetchTasks(
  key: TaskFilter,
): Promise<MetaResponse<Task, TaskInfo>> {
  try {
    const response = await API.get('', {
      params: { filter: key },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createTask(title: string): Promise<string | Task> {
  try {
    const response = await API.post('', {
      title,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateTask(id: number, title: string): Promise<Task> {
  try {
    const response = await API.put(`/${id}`, { title: title });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStatusTask(
  id: number,
  isDone: boolean,
): Promise<Task> {
  try {
    const response = await API.put(`/${id}`, { isDone: isDone });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(id: number) {
  try {
    await API.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
}
