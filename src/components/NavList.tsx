import { useState } from 'react';
import { Filter, TaskInfo } from '../types/types';
import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
const { Text } = Typography;

export type NavListProps = {
  updateTasks: (filter: Filter) => Promise<void>;
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

  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const onChange = async (key: string) => {
    const filter = key as Filter;
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
