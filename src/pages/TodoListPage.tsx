import { useState, useEffect } from 'react';
import { fetchTasks } from '../api/http';
import { Task, TaskInfo, ErrorType, Filter } from '../types/types';
import InputArea from '../components/InputArea';
import NavList from '../components/NavList';
import ListElements from '../components/ListElements';
import ErrorPage from '../components/Error';

const TodoListPage: React.FC = () => {
  const [tasksInfo, setTasksInfo] = useState<TaskInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [taskError, setTaskError] = useState<ErrorType>();
  const [taskFilter, setTaskFilter] = useState<Filter>('all');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchUserTasks() {
      try {
        updateTasks(taskFilter);
      } catch (error) {
        setTaskError({
          message:
            error instanceof Error
              ? error.message
              : 'Failed to fetch user task!',
        });
      }
    }
    fetchUserTasks();

    const intervalId: number = setInterval(fetchUserTasks, 5000);
    return () => clearInterval(intervalId);
  }, [taskFilter]);

  async function updateTasks(filter: Filter) {
    const tasks = await fetchTasks(filter);
    setTasks(tasks.data);
    setTasksInfo(tasks.info);
    setTaskFilter(filter);
  }

  return (
    <div className='todo-wrapper'>
      <InputArea updateTasks={() => updateTasks(taskFilter)} />
      {!taskError ? (
        <NavList updateTasks={updateTasks} tasksInfo={tasksInfo} />
      ) : (
        <ErrorPage title='An error occurred!' message={taskError.message} />
      )}
      <ListElements tasks={tasks} updateTasks={() => updateTasks(taskFilter)} />
    </div>
  );
};

export default TodoListPage;
