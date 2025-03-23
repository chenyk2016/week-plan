import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import WeeklyPlanner from './pages/weekly-planner';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';

// 引入 Ant Design 的样式
import 'antd/dist/reset.css';
import './App.css';

function App() {
  // 获取基础路径，用于部署到GitHub Pages
  const basePath = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<Navigate to="/weekly-planner" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/weekly-planner" element={<WeeklyPlanner />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
