import { Layout, Menu, theme } from 'antd';
import { 
  CalendarOutlined, 
  DashboardOutlined, 
  SettingOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Sider, Content } = Layout;

const MainLayout = () => {
  const location = useLocation();
  
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const getSelectedKey = () => {
    const pathname = location.pathname;
    if (pathname.includes('/weekly-planner')) return '1';
    if (pathname.includes('/dashboard')) return '2';
    if (pathname.includes('/settings')) return '3';
    return '1';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider  collapsible theme="light">
        <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          mode="inline"
          defaultSelectedKeys={[getSelectedKey()]}
          items={[
            {
              key: '1',
              icon: <CalendarOutlined />,
              label: <Link to="/weekly-planner">周计划</Link>,
            },
            {
              key: '2',
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">仪表盘</Link>,
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: <Link to="/settings">设置</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 