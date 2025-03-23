import { Layout, Menu, theme } from 'antd';
import { 
  CalendarOutlined, 
  DashboardOutlined, 
  SettingOutlined,
  FormOutlined
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
    if (pathname.includes('/questionnaire')) return '4';
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
              key: '4',
              icon: <FormOutlined />,
              label: <Link to="/questionnaire">能力评估</Link>,
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