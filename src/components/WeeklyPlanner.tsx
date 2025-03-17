import React from 'react';
import './WeeklyPlanner.css';

const WeeklyPlanner: React.FC = () => {
  // 生成时间段数组（上午8点到下午8点）
  const morningTimeSlots = [8, 9, 10, 11, 12];
  const afternoonTimeSlots = [1, 2, 3, 4, 5, 6, 7, 8];
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  
  // 生成7个角色/目标占位符
  const roles = Array(7).fill(null);

  return (
    <div className="weekly-planner">
      {/* 左侧部分 */}
      <div className="left-panel">
        <div className="header">
          <div className="title">周 计 划</div>
        </div>
        
        <div className="role-section">
          <div className="role-header">
            <div className="role-label">角色</div>
            <div className="goal-label">目标</div>
          </div>
          
          {roles.map((_, index) => (
            <div className="role-row" key={index}>
              <div className="arrow-icon"></div>
              <div className="role-content"></div>
            </div>
          ))}
          
          <div className="update-section">
            <div className="update-title">不断更新</div>
            <div className="update-items">
              <div className="update-item">
                <span className="item-label">身体</span>
                <div className="item-line"></div>
              </div>
              <div className="update-item">
                <span className="item-label">智力</span>
                <div className="item-line"></div>
              </div>
              <div className="update-item">
                <span className="item-label">精神</span>
                <div className="item-line"></div>
              </div>
              <div className="update-item">
                <span className="item-label">社会/情感</span>
                <div className="item-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 右侧部分 */}
      <div className="right-panel">
        <div className="week-header">
          <div className="week-cell">第 周</div>
          {weekdays.map((day, index) => (
            <div className="day-cell" key={index}>{day}</div>
          ))}
        </div>
        
        <div className="tasks-section">
          {/* 本周要务行 */}
          <div className="week-tasks-row">
            <div className="week-task-label">本周要务</div>
            <div className="day-task">本日要务</div>
            <div className="empty-cells">本日要务</div>
          </div>
          
          {/* 空白行 */}
          {Array(10).fill(null).map((_, index) => (
            <div className="empty-row" key={index}>
              <div className="week-cell"></div>
              {Array(7).fill(null).map((_, dayIndex) => (
                <div className="day-cell" key={dayIndex}></div>
              ))}
            </div>
          ))}
          
          {/* 约会/任务行 */}
          <div className="appointment-row">
            <div className="week-cell"></div>
            <div className="appointment-cell-small">约会/任务</div>
            <div className="appointment-cell-large">约会/任务</div>
          </div>
          
          {/* 上午时间表部分 */}
          {morningTimeSlots.map((time, index) => (
            <div className="time-row" key={index}>
              <div className="week-cell"></div>
              {Array(7).fill(null).map((_, dayIndex) => (
                <div className="time-cell" key={dayIndex}>
                  {time}
                </div>
              ))}
            </div>
          ))}
          
          {/* 下午时间表部分 */}
          {afternoonTimeSlots.map((time, index) => (
            <div className="time-row" key={index}>
              <div className="week-cell"></div>
              {Array(7).fill(null).map((_, dayIndex) => (
                <div className="time-cell" key={dayIndex}>
                  {time}
                </div>
              ))}
            </div>
          ))}
          
          {/* 晚上行 */}
          <div className="evening-row">
            <div className="week-cell"></div>
            {Array(7).fill(null).map((_, dayIndex) => (
              <div className="evening-cell" key={dayIndex}>
                晚上
              </div>
            ))}
          </div>
          
          {/* 最后一行空白 */}
          <div className="last-row">
            <div className="week-cell"></div>
            {Array(7).fill(null).map((_, dayIndex) => (
              <div className="day-cell" key={dayIndex}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner; 