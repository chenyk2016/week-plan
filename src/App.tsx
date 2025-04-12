import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import MainLayout from './layouts/MainLayout';
import WeeklyPlanner from './pages/weekly-planner';
import Questionnaire from './pages/questionnaire';
import HabitsAssessment from './pages/habits-assessment';


// 引入 Ant Design 的样式
import 'antd/dist/reset.css';
import './App.css';

function App() {
  // 获取基础路径，用于部署到GitHub Pages
  const basePath = import.meta.env.BASE_URL || '/';

  return (
    <ConfigProvider 
      locale={zhCN} 
    >
      <AntdApp>
        <BrowserRouter basename={basePath}>
          <Routes>
            <Route path="/" element={<Navigate to="/weekly-planner" replace />} />
            <Route element={<MainLayout />}>
              <Route path="/weekly-planner" element={<WeeklyPlanner />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/habits-assessment" element={<HabitsAssessment />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
