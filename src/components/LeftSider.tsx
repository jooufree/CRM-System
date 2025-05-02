import { Button, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useLocation, useNavigate } from 'react-router';
import {
  BarChartOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createElement, useState } from 'react';

export default function LeftSider() {
  const location = useLocation();
  const navigate = useNavigate();
  const [onCollapse, setOnCollapse] = useState<boolean>(false);

  const items: MenuProps['items'] = [
    {
      key: '/my-profile',
      icon: createElement(UserOutlined),
      label: `My Profile`,
    },
    {
      key: '/',
      icon: createElement(BarChartOutlined),
      label: `Todo List`,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={onCollapse}
      trigger={null}
      style={{
        backgroundColor: '#f1f6f8',
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
        borderRight: '3px solid #3399ff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button
        type='primary'
        style={{
          background: 'transparent',
          borderRadius: '0',
          color: '#007bff',
          width: '100%',
          height: '3rem',
          boxShadow: 'none',
        }}
        onClick={() => setOnCollapse((collapse) => !collapse)}
      >
        {onCollapse ? <RightOutlined /> : <LeftOutlined />}
      </Button>

      <Menu
        style={{
          backgroundColor: '#f1f6f8',
        }}
        selectedKeys={[location.pathname]}
        onClick={(event) => navigate(event.key)}
        mode='inline'
        items={items}
      />
    </Sider>
  );
}
