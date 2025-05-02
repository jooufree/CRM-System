import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import LeftSider from './components/LeftSider';

const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout>
      <LeftSider />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
