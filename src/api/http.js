export async function fetchTasks(key) {
  const response = await fetch(
    `https://easydev.club/api/v1//todos?filter=${key}`,
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch for tasks');
  }
  return { data: resData.data, info: resData.info };
}

export async function createUserTask(title) {
  const response = await fetch('https://easydev.club/api/v1/todos', {
    method: 'POST',
    body: JSON.stringify({ title: title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update user DATA.');
  }

  const resData = await response.json();

  return resData.message;
}

export async function updateUserTask(id, title) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title: title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update user DATA.');
  }

  const resData = await response.json();

  return resData.message;
}

export async function updateUserStatusTask(id, isDone) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ isDone: !isDone }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update user DATA.');
  }

  const resData = await response.json();

  return resData.message;
}

export async function deleteUserTask(id) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete user DATA.');
  }

  const resData = await response.text();

  return resData.message;
}
