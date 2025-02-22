import { useState, useEffect, createElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import {
  fetchTasks,
  createUserTask,
  deleteUserTask,
  updateUserStatusTask,
  updateUserTask,
} from './api/http';
import { Layout, Menu, Form } from 'antd';
import { BarChartOutlined, UserOutlined } from '@ant-design/icons';
const { Content, Sider } = Layout;

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

  const [inputValue] = Form.useForm();

  const elementProps = {
    handleDeleteTask,
    handleCheckedTask,
    handleEditTask,
    handleChangeTask,
    checkEditing,
    handleReturn,
  };

  const routes = [
    { path: '/', tasks: allTasks },
    { path: '/process', tasks: inWorkTasks },
    { path: '/done', tasks: completedTasks },
  ];

  const items = [
    {
      key: 1,
      icon: createElement(UserOutlined),
      label: `My Profile`,
    },
    {
      key: 2,
      icon: createElement(BarChartOutlined),
      label: `Todo List`,
    },
  ];

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
      <Layout hasSider className='main'>
        <Sider
          theme='light'
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
          }}
        >
          <div className='demo-logo-vertical' />
          <Menu
            theme='light'
            mode='inline'
            defaultSelectedKeys={['2']}
            items={items}
          />
        </Sider>
        <Content style={{ minHeight: '100vh' }}>
          <div className='todo-wrapper'>
            <InputArea handleChange={handleAddTask} inputValue={inputValue} />
            {!error ? (
              <NavList tasksInfo={tasksInfo} />
            ) : (
              <ErrorPage title='An error occurred!' message={error.message} />
            )}
            <Routes>
              {routes.map(({ path, tasks }) => (
                <Route
                  key={path}
                  path={path}
                  element={<ListElements tasks={tasks} {...elementProps} />}
                />
              ))}
            </Routes>
          </div>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
