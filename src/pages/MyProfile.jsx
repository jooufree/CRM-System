import { Layout, Space } from 'antd';
import { Typography } from 'antd';
import LeftSider from '../components/LeftSider';
const { Title } = Typography;
const { Content } = Layout;

export default function MyProfile() {
  return (
    <Layout>
      <LeftSider />
      <Content
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Space>
          <Title>Привет!</Title>
        </Space>{' '}
      </Content>
    </Layout>
  );
}
