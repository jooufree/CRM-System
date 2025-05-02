import { List } from 'antd';
import ListItem from './ListItem';
import { Task } from '../types/types';

type ListElementsProps = {
  tasks: Task[];
  updateTasks: () => Promise<void>;
};

const ListElements: React.FC<ListElementsProps> = ({ tasks, updateTasks }) => {
  return (
    <List
      itemLayout='horizontal'
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          key={task.id}
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <ListItem task={task} updateTasks={updateTasks} />
        </List.Item>
      )}
      split={false}
    />
  );
};

export default ListElements;
