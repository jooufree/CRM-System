import { useState } from 'react';
import { TaskFilter, TaskInfo } from '../types/types';
import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
const { Text } = Typography;

export type NavListProps = {
  updateTasks: (filter: TaskFilter) => Promise<void>;
  tasksInfo: TaskInfo;
};

const NavList: React.FC<NavListProps> = ({ updateTasks, tasksInfo }) => {
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: <Text type='secondary'>Все задачи ({tasksInfo?.all})</Text>,
    },
    {
      key: 'inWork',
      label: <Text type='secondary'>В процессе ({tasksInfo?.inWork})</Text>,
    },
    {
      key: 'completed',
      label: <Text type='secondary'>Сделано ({tasksInfo?.completed})</Text>,
    },
  ];

  const [activeFilter, setActiveFilter] = useState<TaskFilter>(TaskFilter.All);

  const onChange = async (key: string) => {
    const filter = key as TaskFilter;
    setActiveFilter(filter);
    await updateTasks(filter);
  };

  return (
    <Tabs
      activeKey={activeFilter}
      onChange={onChange}
      items={items}
      type='line'
      style={{ width: '27rem' }}
      centered={true}
    />
  );
};

export default NavList;
