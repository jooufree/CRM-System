import { Layout, Space } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
const { Content } = Layout;

export default function NotFound() {
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
          <Title>Page not found...</Title>
        </Space>
      </Content>
    </Layout>
  );
}
