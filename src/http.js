export async function fetchTasks(key) {
  const response = await fetch(
    `https://easydev.club/api/v1//todos?filter=${key}`,
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch for tasks');
  }
  return resData.data;
}

export async function updateUserPlaces(title) {
  console.log(title);
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
