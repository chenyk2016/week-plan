import { Card, Col, Row, Statistic } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>计划管理仪表盘</h1>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic 
              title="本周计划总数" 
              value={12} 
              prefix={<ClockCircleOutlined />} 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic 
              title="已完成计划" 
              value={5} 
              valueStyle={{ color: '#3f8600' }}
              prefix={<CheckCircleOutlined />} 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic 
              title="未完成计划" 
              value={7} 
              valueStyle={{ color: '#cf1322' }}
              prefix={<ExclamationCircleOutlined />} 
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={24}>
          <Card title="完成率统计" style={{ marginBottom: 24 }}>
            <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p>这里可以放置完成率统计图表</p>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Card title="最近添加的计划">
            <ul>
              <li>完成项目文档 - 周一</li>
              <li>客户会议 - 周二</li>
              <li>团队建设活动 - 周三</li>
              <li>代码审查 - 周四</li>
              <li>周会 - 周五</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="待办事项">
            <ul>
              <li>完成API设计</li>
              <li>修复已知bug</li>
              <li>优化性能</li>
              <li>更新测试用例</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 