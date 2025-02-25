import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { fetchTasks } from '../api/http';
import { Layout, ConfigProvider } from 'antd';

import InputArea from '../components/InputArea';
import NavList from '../components/NavList';
import ErrorPage from '../components/Error';
import LeftSider from '../components/LeftSider';

const { Content } = Layout;

export default function TodoListPage({
  setAllTasks,
  setInWorkTasks,
  setCompletedTasks,
  setIsChange,
  isChange,
  handleAddTask,
  inputValue,
}) {
  const [tasksInfo, setTasksInfo] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  const [error, setError] = useState();

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUserTasks();
    }, 5000);
    fetchUserTasks();
    return () => clearInterval(intervalId);
  }, [isChange]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            borderRadiusSM: '50%',
            controlInteractiveSize: 19,
          },
        },
      }}
    >
      <Layout hasSider>
        <LeftSider />
        <Content
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <div className='todo-wrapper'>
            <InputArea handleChange={handleAddTask} inputValue={inputValue} />
            {!error ? (
              <NavList tasksInfo={tasksInfo} />
            ) : (
              <ErrorPage title='An error occurred!' message={error.message} />
            )}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
