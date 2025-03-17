import React, { useState, useEffect, useRef } from 'react';
import './WeeklyPlanner.css';

// 定义本地存储的键名
const STORAGE_KEY = 'weekly-planner-data';

// 检查localStorage是否可用
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('localStorage不可用:', e);
    return false;
  }
};

const WeeklyPlanner: React.FC = () => {
  // 生成时间段数组（上午8点到下午8点）
  const morningTimeSlots = [8, 9, 10, 11, 12];
  const afternoonTimeSlots = [1, 2, 3, 4, 5, 6, 7, 8];
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  
  // 使用ref跟踪初始化状态
  const isInitializing = useRef(true);
  
  // 初始化状态
  const [weekNumber, setWeekNumber] = useState<string>('');
  const [roleContents, setRoleContents] = useState<string[]>(Array(7).fill(''));
  const [goalContents, setGoalContents] = useState<string[]>(Array(7).fill(''));
  const [updateContents, setUpdateContents] = useState<string[]>(Array(4).fill(''));
  const [weekTasks, setWeekTasks] = useState<string[]>(Array(10).fill(''));
  const [dayTasks, setDayTasks] = useState<string[][]>(Array(7).fill(null).map(() => Array(10).fill('')));
  const [appointmentTasks, setAppointmentTasks] = useState<string[][]>(Array(7).fill(null).map(() => Array(13).fill('')));
  const [eveningTasks, setEveningTasks] = useState<string[]>(Array(7).fill(''));
  const [lastRowTasks, setLastRowTasks] = useState<string[]>(Array(7).fill(''));
  
  // 状态指示localStorage是否可用
  const [isStorageAvailable, setIsStorageAvailable] = useState<boolean>(true);
  
  // 检查localStorage是否可用
  useEffect(() => {
    const available = isLocalStorageAvailable();
    setIsStorageAvailable(available);
    if (!available) {
      console.warn('localStorage不可用，数据将不会被保存');
    }
  }, []);

  // 从localStorage加载数据
  useEffect(() => {
    if (!isStorageAvailable) return;
    
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      console.log('尝试加载数据:', savedData ? '数据存在' : '无数据');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log('解析的数据:', parsedData);
        
        if (parsedData.weekNumber !== undefined) setWeekNumber(parsedData.weekNumber);
        if (parsedData.roleContents) setRoleContents(parsedData.roleContents);
        if (parsedData.goalContents) setGoalContents(parsedData.goalContents);
        if (parsedData.updateContents) setUpdateContents(parsedData.updateContents);
        if (parsedData.weekTasks) setWeekTasks(parsedData.weekTasks);
        if (parsedData.dayTasks) setDayTasks(parsedData.dayTasks);
        if (parsedData.appointmentTasks) setAppointmentTasks(parsedData.appointmentTasks);
        if (parsedData.eveningTasks) setEveningTasks(parsedData.eveningTasks);
        if (parsedData.lastRowTasks) setLastRowTasks(parsedData.lastRowTasks);
        
        console.log('数据加载成功');
      }
      
      // 设置一个延时，确保所有状态都已更新后再允许保存
      setTimeout(() => {
        isInitializing.current = false;
        console.log('初始化完成，现在可以保存数据');
      }, 1000);
    } catch (error) {
      console.error('加载保存的数据时出错:', error);
      isInitializing.current = false;
    }
  }, [isStorageAvailable]);

  // 保存数据到localStorage
  const saveDataToLocalStorage = () => {
    if (!isStorageAvailable || isInitializing.current) {
      console.log('跳过保存：', isInitializing.current ? '正在初始化' : 'localStorage不可用');
      return;
    }
    
    try {
      const dataToSave = {
        weekNumber,
        roleContents,
        goalContents,
        updateContents,
        weekTasks,
        dayTasks,
        appointmentTasks,
        eveningTasks,
        lastRowTasks
      };
      
      const dataString = JSON.stringify(dataToSave);
      localStorage.setItem(STORAGE_KEY, dataString);
      console.log('数据已保存到localStorage', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('保存数据时出错:', error);
    }
  };
  
  // 使用useEffect监听状态变化并保存数据
  useEffect(() => {
    // 如果正在初始化，跳过保存
    if (isInitializing.current) {
      console.log('初始化中，跳过自动保存');
      return;
    }
    
    const timeoutId = setTimeout(() => {
      saveDataToLocalStorage();
    }, 500); // 添加500ms的防抖，避免频繁保存
    
    return () => clearTimeout(timeoutId);
  }, [
    weekNumber,
    roleContents,
    goalContents,
    updateContents,
    weekTasks,
    dayTasks,
    appointmentTasks,
    eveningTasks,
    lastRowTasks,
    isStorageAvailable
  ]);

  // 手动保存数据
  const handleManualSave = () => {
    // 手动保存时，即使在初始化阶段也强制保存
    isInitializing.current = false;
    saveDataToLocalStorage();
    alert('数据已保存！');
  };

  // 清除所有数据
  const handleClearAll = () => {
    if (window.confirm('确定要清除所有数据吗？此操作不可恢复。')) {
      setWeekNumber('');
      setRoleContents(Array(7).fill(''));
      setGoalContents(Array(7).fill(''));
      setUpdateContents(Array(4).fill(''));
      setWeekTasks(Array(10).fill(''));
      setDayTasks(Array(7).fill(null).map(() => Array(10).fill('')));
      setAppointmentTasks(Array(7).fill(null).map(() => Array(13).fill('')));
      setEveningTasks(Array(7).fill(''));
      setLastRowTasks(Array(7).fill(''));
      
      if (isStorageAvailable) {
        try {
          localStorage.removeItem(STORAGE_KEY);
          console.log('数据已从localStorage中清除');
        } catch (error) {
          console.error('清除数据时出错:', error);
        }
      }
    }
  };

  // 处理角色内容变化
  const handleRoleChange = (index: number, value: string) => {
    const newRoleContents = [...roleContents];
    newRoleContents[index] = value;
    setRoleContents(newRoleContents);
  };

  // 处理目标内容变化
  const handleGoalChange = (index: number, value: string) => {
    const newGoalContents = [...goalContents];
    newGoalContents[index] = value;
    setGoalContents(newGoalContents);
  };

  // 处理更新内容变化
  const handleUpdateChange = (index: number, value: string) => {
    const newUpdateContents = [...updateContents];
    newUpdateContents[index] = value;
    setUpdateContents(newUpdateContents);
  };

  // 处理周任务内容变化
  const handleWeekTaskChange = (index: number, value: string) => {
    const newWeekTasks = [...weekTasks];
    newWeekTasks[index] = value;
    setWeekTasks(newWeekTasks);
  };

  // 处理日任务内容变化
  const handleDayTaskChange = (dayIndex: number, rowIndex: number, value: string) => {
    const newDayTasks = [...dayTasks];
    newDayTasks[dayIndex][rowIndex] = value;
    setDayTasks(newDayTasks);
  };

  // 处理约会/任务内容变化
  const handleAppointmentChange = (dayIndex: number, timeIndex: number, value: string) => {
    const newAppointmentTasks = [...appointmentTasks];
    newAppointmentTasks[dayIndex][timeIndex] = value;
    setAppointmentTasks(newAppointmentTasks);
  };

  // 处理晚上内容变化
  const handleEveningChange = (dayIndex: number, value: string) => {
    const newEveningTasks = [...eveningTasks];
    newEveningTasks[dayIndex] = value;
    setEveningTasks(newEveningTasks);
  };

  // 处理最后一行内容变化
  const handleLastRowChange = (dayIndex: number, value: string) => {
    const newLastRowTasks = [...lastRowTasks];
    newLastRowTasks[dayIndex] = value;
    setLastRowTasks(newLastRowTasks);
  };

  return (
    <div className="weekly-planner">
      {/* 左侧部分 */}
      <div className="left-panel">
        <div className="header">
          <div className="title">周 计 划</div>
          <div className="button-group">
            <button className="save-button" onClick={handleManualSave}>保存数据</button>
            <button className="clear-button" onClick={handleClearAll}>清除数据</button>
          </div>
          {!isStorageAvailable && (
            <div className="storage-warning">
              localStorage不可用，数据将不会被自动保存
            </div>
          )}
        </div>
        
        <div className="role-section">
          <div className="role-header">
            <div className="role-label">角色</div>
            <div className="goal-label">目标</div>
          </div>
          
          {Array(7).fill(null).map((_, index) => (
            <div className="role-row" key={index}>
              <div className="arrow-icon">
                <input
                  type="text"
                  className="editable-cell"
                  value={roleContents[index]}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  placeholder="输入角色"
                />
              </div>
              <div className="role-content">
                <textarea
                  className="editable-cell"
                  value={goalContents[index]}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  placeholder="输入目标"
                />
              </div>
            </div>
          ))}
          
          <div className="update-section">
            <div className="update-title">不断更新</div>
            <div className="update-items">
              <div className="update-item">
                <span className="item-label">身体</span>
                <div className="item-line">
                  <input
                    type="text"
                    className="editable-cell"
                    value={updateContents[0]}
                    onChange={(e) => handleUpdateChange(0, e.target.value)}
                  />
                </div>
              </div>
              <div className="update-item">
                <span className="item-label">智力</span>
                <div className="item-line">
                  <input
                    type="text"
                    className="editable-cell"
                    value={updateContents[1]}
                    onChange={(e) => handleUpdateChange(1, e.target.value)}
                  />
                </div>
              </div>
              <div className="update-item">
                <span className="item-label">精神</span>
                <div className="item-line">
                  <input
                    type="text"
                    className="editable-cell"
                    value={updateContents[2]}
                    onChange={(e) => handleUpdateChange(2, e.target.value)}
                  />
                </div>
              </div>
              <div className="update-item">
                <span className="item-label">社会/情感</span>
                <div className="item-line">
                  <input
                    type="text"
                    className="editable-cell"
                    value={updateContents[3]}
                    onChange={(e) => handleUpdateChange(3, e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 右侧部分 */}
      <div className="right-panel">
        <div className="week-header">
          <div className="week-cell">
            第 
            <input
              type="text"
              className="week-number-input"
              value={weekNumber}
              onChange={(e) => setWeekNumber(e.target.value)}
              placeholder=" "
            /> 
            周
          </div>
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
          
          {/* 空白行 - 可编辑的任务 */}
          {Array(10).fill(null).map((_, rowIndex) => (
            <div className="empty-row" key={rowIndex}>
              <div className="week-cell">
                <textarea
                  className="editable-cell"
                  value={weekTasks[rowIndex]}
                  onChange={(e) => handleWeekTaskChange(rowIndex, e.target.value)}
                />
              </div>
              {Array(7).fill(null).map((_, dayIndex) => (
                <div className="day-cell" key={dayIndex}>
                  <textarea
                    className="editable-cell"
                    value={dayTasks[dayIndex][rowIndex]}
                    onChange={(e) => handleDayTaskChange(dayIndex, rowIndex, e.target.value)}
                  />
                </div>
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
          {morningTimeSlots.map((time, timeIndex) => (
            <div className="time-row" key={timeIndex}>
              <div className="week-cell">{time}</div>
              {Array(7).fill(null).map((_, dayIndex) => (
                <div className="time-cell" key={dayIndex}>
                  <textarea
                    className="editable-cell"
                    value={appointmentTasks[dayIndex][timeIndex]}
                    onChange={(e) => handleAppointmentChange(dayIndex, timeIndex, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
          
          {/* 下午时间表部分 */}
          {afternoonTimeSlots.map((time, index) => (
            <div className="time-row" key={index + 5}>
              <div className="week-cell">{time}</div>
              {Array(7).fill(null).map((_, dayIndex) => (
                <div className="time-cell" key={dayIndex}>
                  <textarea
                    className="editable-cell"
                    value={appointmentTasks[dayIndex][index + 5]}
                    onChange={(e) => handleAppointmentChange(dayIndex, index + 5, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
          
          {/* 晚上行 */}
          <div className="evening-row">
            <div className="week-cell">晚上</div>
            {Array(7).fill(null).map((_, dayIndex) => (
              <div className="evening-cell" key={dayIndex}>
                <textarea
                  className="editable-cell"
                  value={eveningTasks[dayIndex]}
                  onChange={(e) => handleEveningChange(dayIndex, e.target.value)}
                />
              </div>
            ))}
          </div>
          
          {/* 最后一行空白 */}
          <div className="last-row">
            <div className="week-cell"></div>
            {Array(7).fill(null).map((_, dayIndex) => (
              <div className="day-cell" key={dayIndex}>
                <textarea
                  className="editable-cell"
                  value={lastRowTasks[dayIndex]}
                  onChange={(e) => handleLastRowChange(dayIndex, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner; 