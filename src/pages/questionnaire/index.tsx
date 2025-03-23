import React, { useState } from 'react';
import { Form, Radio, Button, Card, message, Progress, Row, Col, Divider } from 'antd';
import './index.css';

interface QuestionnaireItem {
  key: string;
  question: string;
  score: number;
}

const Questionnaire: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<QuestionnaireItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const questions = [
    "1. 当我听到不同的意见，我让其进一步详细说明和解释。",
    "2. 出现分歧时，表达自己的意见比顺从大多数人的意见更加重要。",
    "3. 我经常和与我持不同意见的人共同工作。",
    "4. 我试图利用他人的知识和技能来更好地完成任务。",
    "5. 我发现由具有不同背景的人组成工作小组非常有益。",
    "6. 我深信每个人都以独特的方式对自己的家庭和组织做出贡献。",
    "7. 我积极寻找机会向他人学习。",
    "8. 我与他人分享自己的观点，尽管我们的观点有所不同。",
    "9. 致力于某个项目时，我寻求不同的想法和意见。",
    "10. 当我参与创造性工作时，我倾向于大家一起开动脑筋、集思广益，而不是依赖专家的意见。"
  ];

  const options = [
    { label: "从不", value: 1 },
    { label: "偶尔", value: 2 },
    { label: "有时", value: 3 },
    { label: "经常", value: 4 },
    { label: "总是", value: 5 }
  ];

  const getScoreCategory = () => {
    if (totalScore >= 41 && totalScore <= 50) {
      return 'high';
    } else if (totalScore >= 21 && totalScore <= 40) {
      return 'medium';
    } else {
      return 'low';
    }
  };

  const onFinish = (values: any) => {
    setSubmitting(true);

    // 计算结果
    const resultItems: QuestionnaireItem[] = Object.keys(values).map(key => {
      const questionIndex = parseInt(key.replace('question', ''));
      return {
        key: key,
        question: questions[questionIndex - 1],
        score: values[key]
      };
    });

    // 计算总分
    const score = resultItems.reduce((sum, item) => sum + item.score, 0);

    setResults(resultItems);
    setTotalScore(score);
    setSubmitted(true);
    setSubmitting(false);
    messageApi.success('提交成功！');
  };

  const onReset = () => {
    form.resetFields();
    setSubmitted(false);
    setResults([]);
    setTotalScore(0);
  };

  return (
    <div className="questionnaire-container">
      {contextHolder}
      <h1>你对差异有多尊重</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>在你能充分利用他人的优势之前，你首先要承认并尊重他们的差异。那么，你到底对于差异有多尊重？做一做下面的小练习就知道了。</p>

      <Card>
        <Form
          form={form}
          name="questionnaire"
          onFinish={onFinish}
          onFinishFailed={() => messageApi.error('请选择所有问题')}
          layout="vertical"
          requiredMark={false}
        >
          {/* 表头 */}
          <Row className="question-header-row">
            <Col flex="1 1 50%">问题</Col>
            <Col flex="1 1 50%" style={{ textAlign: 'center' }}>
              {options.map(option => `${option.label} (${option.value})`).join(' / ')}
            </Col>
          </Row>

          <Divider style={{ margin: '8px 0' }} />

          {/* 问题列表 */}
          {questions.map((question, index) => (
            <React.Fragment key={index}>
              <Row className="question-row" align="middle">
                <Col flex="1 1 50%" className="question-text">
                  {question}
                </Col>
                <Col flex="1 1 50%">
                  <Form.Item
                    name={`question${index + 1}`}
                    rules={[{ required: true, message: '请选择' }]}
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group style={{ textAlign: 'left' }}>
                      <Row>
                        {options.map(option => (
                          <Col span={24 / 5} key={option.value} className="radio-cell">
                            <Radio value={option.value}>{option.value}</Radio>
                          </Col>
                        ))}
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              {index < questions.length - 1 && <Divider style={{ margin: '8px 0' }} />}
            </React.Fragment>
          ))}

          {/* 按钮区域 */}
          <div className="form-buttons">
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
            <Button htmlType="button" onClick={onReset} style={{ marginLeft: 10 }}>
              重置
            </Button>
          </div>
        </Form>

        {/* 结果区域 */}
        {submitted && (
          <div className="results-section">
            <h2>结果</h2>

            <div style={{ marginBottom: 20 }}>
              <h3>总分: {totalScore} 分</h3>
              <Progress
                percent={totalScore * 2}
                status="active"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </div>

            <div className="score-categories">
              <div className={`score-category ${getScoreCategory() === 'high' ? 'active' : ''}`}>
                <h3>41—50分：</h3>
                <p>充分发挥了你与他人差异互补的作用。</p>
              </div>

              <div className={`score-category ${getScoreCategory() === 'medium' ? 'active' : ''}`}>
                <h3>21—40分：</h3>
                <p>一般水平发挥了你与他人差异互补的作用。</p>
              </div>

              <div className={`score-category ${getScoreCategory() === 'low' ? 'active' : ''}`}>
                <h3>10—20分：</h3>
                <p>没有发挥你与他人差异互补的作用。</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Questionnaire;