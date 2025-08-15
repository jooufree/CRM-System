import { List } from 'antd';
import TaskItem from './TaskItem';
import { Task } from '../types/types';

type TasksListProps = {
  tasks: Task[];
  updateTasks: () => Promise<void>;
};

const TasksList: React.FC<TasksListProps> = ({ tasks, updateTasks }) => {
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
          <TaskItem task={task} updateTasks={updateTasks} />
        </List.Item>
      )}
      split={false}
    />
  );
};

export default TasksList;
