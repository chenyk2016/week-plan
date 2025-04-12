// src/pages/habits-assessment/index.tsx
import React, { useState } from 'react';
import { Form, Radio, Button, Card, message, Progress, Divider, Alert } from 'antd';
import './index.css';

interface HabitQuestion {
  id: number;
  text: string;
  category: string;
}

interface CategoryScores {
  [key: string]: number;
}

const ResultChart: React.FC<{ scores: CategoryScores | null }> = ({ scores }) => {
  if (!scores) return null;

  const categories = [
    '情感账户',
    'P/PC平衡',
    '习惯1',
    '习惯2',
    '习惯3',
    '习惯4',
    '习惯5',
    '习惯6',
    '习惯7'
  ];

  const levels = [
    { score: 18, label: '出色' },
    { score: 15, label: '很好' },
    { score: 12, label: '不错' },
    { score: 9, label: '可以' },
    { score: 6, label: '差' },
    { score: 3, label: '极差' },
  ];

  const getScoreHeight = (score: number) => {
    return `${(score / 18) * 100}%`;
  };

  return (
    <div className="result-chart">
      <h2>七个习惯总分</h2>
      <div className="chart-container">
        <div className="score-labels">
          {Array.from({ length: 18 }, (_, i) => 18 - i).map(score => (
            <div key={score} className="score-label">
              <span>{score}</span>
              {levels.find(level => level.score === score) && (
                <span className="level-label">{levels.find(level => level.score === score)?.label}</span>
              )}
            </div>
          ))}
        </div>
        <div className="chart-columns">
          {categories.map(category => {
            const score = scores[category] || 0;
            return (
              <div key={category} className="chart-column">
                <div className="column-header">{category}</div>
                <div className="column-body">
                  <div 
                    className="score-bar" 
                    style={{ height: getScoreHeight(score) }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const HabitsAssessment: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [scores, setScores] = useState<CategoryScores | null>(null);

  // 问题数据结构
  const questions: { [key: string]: HabitQuestion[] } = {
    '情感账户': [
      { id: 1, text: '我待人和蔼、体谅对方。', category: '情感账户' },
      { id: 2, text: '我信守诺言。', category: '情感账户' },
      { id: 3, text: '我不在别人背后说他的坏话。', category: '情感账户' },
    ],
    'P/PC平衡': [
      { id: 4, text: '我能在生活的各个方面（家庭、朋友、工作等）保持适当的平衡。', category: 'P/PC平衡' },
      { id: 5, text: '当我致力于某个项目时，总是想着雇主的需求和利害关系。', category: 'P/PC平衡' },
      { id: 6, text: '我努力工作，但绝不把自己累得精疲力尽。', category: 'P/PC平衡' },
    ],
    '习惯1': [
      { id: 7, text: '我能掌控自己的生活。', category: '习惯1' },
      { id: 8, text: '我把注意力集中于我能有所作为的事情上，而不是集中于我无法控制的事情。', category: '习惯1' },
      { id: 9, text: '我敢于为自己的情绪负责，而不是埋怨环境、责备他人。', category: '习惯1' },
    ],
    '习惯2': [
      { id: 10, text: '我明白自己在生活中追求什么。', category: '习惯2' },
      { id: 11, text: '我的生活和工作井然有序，很少陷入危机。', category: '习惯2' },
      { id: 12, text: '我每周都有一个清晰的计划，注明我想完成的事情。', category: '习惯2' },
    ],
    '习惯3': [
      { id: 13, text: '我致力于完成自己的计划（避免延误、浪费时间等等）。', category: '习惯3' },
      { id: 14, text: '我不让日常琐事埋没了真正重要的事务。', category: '习惯3' },
      { id: 15, text: '我每天做的事情都是有意义的，有助于实现我的生活目标。', category: '习惯3' },
    ],
    '习惯4': [
      { id: 16, text: '我关心别人的成功，就像关心自己的成功一样。', category: '习惯4' },
      { id: 17, text: '我能与别人合作。', category: '习惯4' },
      { id: 18, text: '遇到矛盾时，我努力寻求有利于各方的解决方案。', category: '习惯4' },
    ],
    '习惯5': [
      { id: 19, text: '我对他人的感觉也很敏感。', category: '习惯5' },
      { id: 20, text: '我尽力理解对方的观点。', category: '习惯5' },
      { id: 21, text: '倾听时，我试图从对方的角度，而不仅从自己的角度来看待问题。', category: '习惯5' },
    ],
    '习惯6': [
      { id: 22, text: '我赞赏并力图了解他人的见解。', category: '习惯6' },
      { id: 23, text: '我调力寻求新的、更好的想法和解决方案。', category: '习惯6' },
      { id: 24, text: '我鼓励他人表达他们的观点。', category: '习惯6' },
    ],
    '习惯7': [
      { id: 25, text: '我珍惜自己的身体和健康。', category: '习惯7' },
      { id: 26, text: '我努力建立并改善与他人的关系。', category: '习惯7' },
      { id: 27, text: '我肯花时间追求生活的意义和乐趣。', category: '习惯7' },
    ],
  };

  const onFinish = (values: any) => {
    setSubmitting(true);
    
    // 计算每个类别的总分
    const categoryScores = Object.entries(questions).reduce((acc, [category, items]) => {
      const scores = items.map(q => values[`question${q.id}`]);
      const total = scores.reduce((sum, score) => sum + score, 0);
      acc[category] = total;
      return acc;
    }, {} as CategoryScores);

    setScores(categoryScores);
    messageApi.success('评估完成！');
    setSubmitting(false);
  };

  return (
    <div className="habits-assessment">
      {contextHolder}
      <h1>七个习惯的评分</h1>

      <Alert style={{ marginBottom: 16, textAlign: "left" }} 
        message={(
          <div>
            <p>这个评估能帮你了解自己在这七个习惯方面的现状。为了检验自己的进步，你可以在读完本书后重新进行一次评估。</p>
            <p>仔细阅读下列表格中的每句话，作出自己的准确判断，圈出与自己的情况相符的数字（1表示极差，6表示出色）​。</p>
          </div>
        )} type="info" />

      <Card>
        <Form
          form={form}
          name="habits-assessment"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          {Object.entries(questions).map(([category, items]) => (
            <div key={category} className="habit-section">
              <h2>{category}</h2>
              <div className="questions-grid">
                {items.map(question => (
                  <div key={question.id} className="question-row">
                    <div className="question-text">
                      {question.text}
                    </div>
                    <Form.Item
                      name={`question${question.id}`}
                      rules={[{ required: true, message: '请选择一个选项' }]}
                      className="score-options"
                    >
                      <Radio.Group>
                        {[1, 2, 3, 4, 5, 6].map(score => (
                          <Radio key={score} value={score}>
                            {score}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="form-actions">
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交评估
            </Button>
            <Button onClick={() => {
              form.resetFields();
              setScores(null);
            }} style={{ marginLeft: 16 }}>
              重置
            </Button>
          </div>
        </Form>
      </Card>

      {scores && (
        <Card style={{ marginTop: 24 }}>
          <ResultChart scores={scores} />
        </Card>
      )}
    </div>
  );
};

export default HabitsAssessment;