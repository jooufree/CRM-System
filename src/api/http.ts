import { Task, TaskInfo } from '../todos';

const BASE_URL = 'https://easydev.club/api/v1/todos';

type MetaResponse<T, N> = {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
};

type ReturnData = {
  data: Task[];
  info?: TaskInfo;
};

export async function fetchTasks(key: string): Promise<ReturnData> {
  try {
    const response = await fetch(`${BASE_URL}?filter=${key}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user DATA.');
    }

    const data: MetaResponse<Task, TaskInfo> = await response.json();

    return { data: data.data, info: data.info };
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

export async function updateUserTask(
  id: number,
  title: string,
): Promise<string | Task> {
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

    const resData: string | Task = await response.json();

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function updateUserStatusTask(
  id: number,
  isDone: boolean,
): Promise<string | Task> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isDone: !isDone }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update user DATA.');
    }

    const resData: string | Task = await response.json();

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserTask(id: number): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user DATA.');
    }

    const resData: string = await response.text();

    return resData;
  } catch (error) {
    throw error;
  }
}
