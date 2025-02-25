import axios from 'axios';

export async function fetchTasks(key) {
  try {
    const response = await axios.get(`https://easydev.club/api/v1/todos`, {
      params: { filter: key },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch for tasks: ${error}`);
  }
}

export async function createUserTask(title) {
  try {
    const response = await axios.post(
      'https://easydev.club/api/v1/todos',
      {
        title: title,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.statusText;
  } catch (error) {
    throw new Error(`Failed to fetch for tasks: ${error}`);
  }
}

export async function updateUserTask(id, title) {
  try {
    const response = await axios.put(
      `https://easydev.club/api/v1/todos/${id}`,
      { title: title },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.statusText;
  } catch (error) {
    throw new Error(`Failed to fetch for tasks: ${error}`);
  }
}

export async function updateUserStatusTask(id, isDone) {
  try {
    const response = await axios.put(
      `https://easydev.club/api/v1/todos/${id}`,
      { isDone: !isDone },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.statusText;
  } catch (error) {
    throw new Error(`Failed to fetch for tasks: ${error}`);
  }
}

export async function deleteUserTask(id) {
  try {
    const response = await axios.delete(
      `https://easydev.club/api/v1/todos/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.statusText;
  } catch (error) {
    throw new Error(`Failed to fetch for tasks: ${error}`);
  }
}
