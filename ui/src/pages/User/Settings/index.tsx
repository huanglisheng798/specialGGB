import { PageContainer } from '@ant-design/pro-components';
import { Card, Switch, message } from 'antd';
import { useModel } from '@umijs/max';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import React from 'react';

/**
 * 个人设置页面
 * @author whiteshader@163.com
 */

const Settings: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  
  // 切换主题模式
  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? 'realDark' : 'light';
    setInitialState((preInitialState) => ({
      ...preInitialState,
      settings: {
        ...preInitialState?.settings,
        navTheme: newTheme,
      },
    }));
    localStorage.setItem('navTheme', newTheme);
    message.success(`已切换到${checked ? '黑夜' : '白天'}模式`);
  };
  
  // 判断当前是否为黑夜模式
  const isDark = initialState?.settings?.navTheme === 'realDark';
  
  return (
    <PageContainer title="个人设置">
      <Card>
        {/* 全局主题设置 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
          <div>
            <h3 style={{ marginBottom: 8 }}>全局主题</h3>
            <p style={{ color: '#666', margin: 0 }}>切换应用的全局显示模式</p>
          </div>
          <Switch
            checked={isDark}
            onChange={toggleTheme}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Settings;
