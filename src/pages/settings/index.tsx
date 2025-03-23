import { Form, Input, Button, Switch, Select, Card, Divider, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Option } = Select;

const Settings = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('设置表单提交:', values);
    message.success('设置已保存');
  };

  return (
    <div className="settings-container">
      <h1>计划管理设置</h1>
      
      <Card style={{ marginBottom: 24 }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            username: '用户',
            language: 'zh',
            darkMode: false,
            notifications: true,
            startDay: 'monday',
            calendarView: 'week'
          }}
          onFinish={onFinish}
        >
          <Divider orientation="left">个人设置</Divider>
          
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="language"
            label="语言"
          >
            <Select>
              <Option value="zh">中文</Option>
              <Option value="en">English</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="darkMode"
            label="深色模式"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          
          <Form.Item
            name="notifications"
            label="启用通知"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          
          <Divider orientation="left">日历设置</Divider>
          
          <Form.Item
            name="startDay"
            label="每周起始日"
          >
            <Select>
              <Option value="monday">周一</Option>
              <Option value="sunday">周日</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="calendarView"
            label="默认视图"
          >
            <Select>
              <Option value="day">日视图</Option>
              <Option value="week">周视图</Option>
              <Option value="month">月视图</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings; 