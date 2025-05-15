import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MainMenu from './components/MainMenu';

const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout>
      <MainMenu />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
