import { Layout, Menu, theme, Button } from 'antd';
import { 
  CalendarOutlined, 
  SettingOutlined,
  FormOutlined,
  CheckCircleOutlined,
  MenuOutlined,
  NodeCollapseOutlined,
  LeftCircleTwoTone
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSelectedKey = () => {
    const pathname = location.pathname;
    if (pathname.includes('/weekly-planner')) return '1';
    if (pathname.includes('/questionnaire')) return '2';
    if (pathname.includes('/habits-assessment')) return '3';
    return '1';
  };

  // 处理菜单项点击
  const handleMenuClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const menuItems = [
    {
      key: '1',
      icon: <CalendarOutlined />,
      label: <Link to="/weekly-planner" onClick={handleMenuClick}>周计划</Link>,
    },
    {
      key: '2',
      icon: <FormOutlined />,
      label: <Link to="/questionnaire" onClick={handleMenuClick}>能力评估</Link>,
    },
    {
      key: '3',
      icon: <CheckCircleOutlined />,
      label: <Link to="/habits-assessment" onClick={handleMenuClick}>七个习惯评估</Link>,
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile && (
        <Header style={{ 
          padding: '0 16px', 
          background: colorBgContainer,
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          height: 40,
        }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64 }}
          />
        </Header>
      )}
      
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: isMobile ? 'fixed' : 'relative',
          left: isMobile && collapsed ? -200 : 0,
          zIndex: 2,
          transition: 'all 0.2s'
        }}
        trigger={null}
      >
        {
          isMobile && (
            <LeftCircleTwoTone
              onClick={() => setCollapsed(!collapsed)}
              style={{ padding: 10, fontSize: 24, cursor: 'pointer' }}
            />
          )
        }
        <Menu
          mode="inline"
          defaultSelectedKeys={[getSelectedKey()]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: isMobile ? '64px 8px 8px' : '24px 16px',
            padding: isMobile ? 12 : 24,
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