import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import {
  fetchTasks,
  createUserTask,
  deleteUserTask,
  updateUserStatusTask,
  updateUserTask,
} from './http';

import InputArea from './components/InputArea';
import NavList from './components/NavList';
import ListElements from './components/ListElements';
import ErrorPage from './components/Error';

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [inWorkTasks, setInWorkTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tasksInfo, setTasksInfo] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [isEditing, setIsEditing] = useState({ id: null });
  const [isChange, setIsChange] = useState(false);
  const [error, setError] = useState();

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function fetchUserTasks() {
      try {
        const allUserTasks = await fetchTasks('all');
        const inWorkUserTasks = await fetchTasks('inWork');
        const completedUserTasks = await fetchTasks('completed');
        setAllTasks(allUserTasks.data);
        setInWorkTasks(inWorkUserTasks.data);
        setCompletedTasks(completedUserTasks.data);
        setTasksInfo(allUserTasks.info);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user tasks.' });
      } finally {
        setIsChange(false);
      }
    }
    fetchUserTasks();
  }, [isChange]);

  function handleAddTask(value) {
    if (value.length > 1 && value.length < 65) {
      createUserTask(value);
      setInputValue('');
      setIsChange(true);
    } else if (value.length < 2) {
      alert('Задача должна состоять минимум из 2 символов!');
    }
  }

  function handleCheckedTask(id, isDone) {
    updateUserStatusTask(id, isDone);
    setIsChange(true);
  }

  function handleEditTask(id) {
    setIsEditing({ id });
    setIsChange(true);
  }

  function handleChangeTask(id, title) {
    if (title.length < 2) {
      alert('Длинна задачи не может быть короче 2 символов!');
      return;
    }
    updateUserTask(id, title);
    setIsEditing({ id: null });
    setIsChange(true);
  }

  function checkEditing(id) {
    if (id === isEditing.id) {
      return true;
    } else false;
  }

  function handleReturn() {
    setIsEditing({ id: null });
    setIsChange(true);
  }

  function handleDeleteTask(id) {
    deleteUserTask(id);
    setIsChange(true);
  }

  return (
    <BrowserRouter>
      <main>
        <InputArea
          handleChange={handleAddTask}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        {!error ? (
          <NavList tasksInfo={tasksInfo} />
        ) : (
          <ErrorPage title='An error occurred!' message={error.message} />
        )}
        <Routes>
          <Route
            path='/'
            element={
              <ListElements
                tasks={allTasks}
                handleDeleteTask={handleDeleteTask}
                handleCheckedTask={handleCheckedTask}
                handleEditTask={handleEditTask}
                handleChangeTask={handleChangeTask}
                checkEditing={checkEditing}
                handleReturn={handleReturn}
              />
            }
          />
          <Route
            path='/process'
            element={
              <ListElements
                tasks={inWorkTasks}
                handleDeleteTask={handleDeleteTask}
                handleCheckedTask={handleCheckedTask}
                handleEditTask={handleEditTask}
                handleChangeTask={handleChangeTask}
                checkEditing={checkEditing}
                handleReturn={handleReturn}
              />
            }
          />
          <Route
            path='/done'
            element={
              <ListElements
                tasks={completedTasks}
                handleDeleteTask={handleDeleteTask}
                handleCheckedTask={handleCheckedTask}
                handleEditTask={handleEditTask}
                handleChangeTask={handleChangeTask}
                checkEditing={checkEditing}
                handleReturn={handleReturn}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
