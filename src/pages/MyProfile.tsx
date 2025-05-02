import { Layout, Space } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
const { Content } = Layout;

export default function MyProfile() {
  return (
    <Layout>
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
