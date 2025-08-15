import { useState, useEffect } from 'react';
import { fetchTasks } from '../api/tasks';
import { Task, TaskInfo, ErrorType, TaskFilter } from '../types/types';
import AddTask from '../components/AddTask';
import NavList from '../components/NavList';
import TasksList from '../components/TasksList';
import { message } from 'antd';

const TodoListPage: React.FC = () => {
  const [tasksInfo, setTasksInfo] = useState<TaskInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [taskError, setTaskError] = useState<ErrorType>();
  const [taskFilter, setTaskFilter] = useState<TaskFilter>(TaskFilter.All);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchUserTasks() {
      try {
        await updateTasks(taskFilter);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch tasks!';
        setTaskError({ message: errorMessage });
        message.error(errorMessage);
      }
    }
    fetchUserTasks();

    const intervalId: number = setInterval(fetchUserTasks, 5000);
    return () => clearInterval(intervalId);
  }, [taskFilter]);

  async function updateTasks(filter: TaskFilter) {
    const tasks = await fetchTasks(filter);
    setTasks(tasks.data);
    setTasksInfo(tasks.info);
    setTaskFilter(filter);
  }

  return (
    <div className='todo-wrapper'>
      <AddTask updateTasks={() => updateTasks(taskFilter)} />
      {!taskError && (
        <div>
          <NavList updateTasks={updateTasks} tasksInfo={tasksInfo} />
          <TasksList
            tasks={tasks}
            updateTasks={() => updateTasks(taskFilter)}
          />
        </div>
      )}
    </div>
  );
};

export default TodoListPage;
