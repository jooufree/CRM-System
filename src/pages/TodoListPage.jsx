import { useState, useEffect } from 'react';
import { fetchTasks } from '../api/http';
import InputArea from '../components/InputArea';
import NavList from '../components/NavList';
import ListElements from '../components/ListElements';
import ErrorPage from '../components/Error';

export default function TodoListPage() {
  const [tasksInfo, setTasksInfo] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [error, setError] = useState();
  const [taskFilter, setTaskFilter] = useState('all');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchUserTasks() {
      try {
        updateTasks(taskFilter);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user tasks.' });
      }
    }
    fetchUserTasks();
  }, []);

  async function updateTasks(filter) {
    const tasks = await fetchTasks(filter);
    setTasks(tasks.data);
    setTasksInfo(tasks.info);
    setTaskFilter(filter);
  }

  return (
    <div className='todo-wrapper'>
      <InputArea updateTasks={updateTasks} taskFilter={taskFilter} />
      {!error ? (
        <NavList updateTasks={updateTasks} tasksInfo={tasksInfo} />
      ) : (
        <ErrorPage title='An error occurred!' message={error.message} />
      )}
      <ListElements
        tasks={tasks}
        updateTasks={updateTasks}
        taskFilter={taskFilter}
      />
    </div>
  );
}
