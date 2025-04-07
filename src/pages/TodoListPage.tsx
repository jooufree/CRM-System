import { useState, useEffect } from 'react';
import { fetchTasks } from '../api/http';
import { Task, TaskInfo } from '../todos';
import InputArea from '../components/InputArea';
import NavList from '../components/NavList';
import ListElements from '../components/ListElements';
import ErrorPage from '../components/Error';

const TodoListPage: React.FC = () => {
  type Error = {
    message: string;
  };

  const [tasksInfo, setTasksInfo] = useState<TaskInfo | undefined>({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [taskError, setTaskError] = useState<Error>();
  const [taskFilter, setTaskFilter] = useState<string>('all');
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
  }, [taskFilter]);

  async function updateTasks(filter: string) {
    const tasks = await fetchTasks(filter);
    setTasks(tasks.data);
    setTasksInfo(tasks.info);
    setTaskFilter(filter);
  }

  return (
    <div className='todo-wrapper'>
      <InputArea updateTasks={updateTasks} taskFilter={taskFilter} />
      {!taskError ? (
        <NavList updateTasks={updateTasks} tasksInfo={tasksInfo} />
      ) : (
        <ErrorPage title='An error occurred!' message={taskError.message} />
      )}
      <ListElements
        tasks={tasks}
        updateTasks={updateTasks}
        taskFilter={taskFilter}
      />
    </div>
  );
};

export default TodoListPage;
