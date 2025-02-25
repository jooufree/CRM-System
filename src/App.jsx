import { useState } from 'react';
import { Form } from 'antd';
import ListElements from './components/ListElements';
import MyProfile from './pages/MyProfile';
import TodoListPage from './pages/TodoListPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import {
  createUserTask,
  deleteUserTask,
  updateUserStatusTask,
  updateUserTask,
} from './api/http';

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [inWorkTasks, setInWorkTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState({ id: null });
  const [isChange, setIsChange] = useState(false);
  const [inputValue] = Form.useForm();

  const taskRoutes = [
    { path: '/', tasks: allTasks },
    { path: '/process', tasks: inWorkTasks },
    { path: '/done', tasks: completedTasks },
  ];

  const elementProps = {
    handleDeleteTask,
    handleCheckedTask,
    handleEditTask,
    handleChangeTask,
    checkEditing,
    handleReturn,
  };

  function handleAddTask(value) {
    if (value.length > 1 && value.length < 65) {
      createUserTask(value);
      inputValue.resetFields();
      setIsChange(true);
    } else return;
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
      <Routes>
        <Route path='/my-profile' element={<MyProfile />} />
        <Route
          path='/'
          element={
            <TodoListPage
              setAllTasks={setAllTasks}
              setInWorkTasks={setInWorkTasks}
              setCompletedTasks={setCompletedTasks}
              setIsChange={setIsChange}
              isChange={isChange}
              handleAddTask={handleAddTask}
              inputValue={inputValue}
            />
          }
        >
          {taskRoutes.map(({ path, tasks }) => (
            <Route
              key={path}
              path={path}
              element={<ListElements tasks={tasks} {...elementProps} />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
