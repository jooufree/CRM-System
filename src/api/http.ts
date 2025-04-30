import { Task, TaskInfo, MetaResponse, Filter } from '../types/types';

const BASE_URL = 'https://easydev.club/api/v1/todos';

export async function fetchTasks(
  key: Filter,
): Promise<MetaResponse<Task, TaskInfo>> {
  try {
    const response = await fetch(`${BASE_URL}?filter=${key}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user DATA.');
    }

    const resData: MetaResponse<Task, TaskInfo> = await response.json();

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function createUserTask(title: string): Promise<string | Task> {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ title: title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create user DATA.');
    }

    const resData: string | Task = await response.json();

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function updateUserTask(id: number, title: string): Promise<Task> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update user DATA.');
    }

    const resData: Task = await response.json();

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function updateUserStatusTask(
  id: number,
  isDone: boolean,
): Promise<Task> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isDone: isDone }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update user DATA.');
    }

    const resData: Task = await response.json();

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserTask(id: number) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw error;
  }
}
