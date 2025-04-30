import classes from './ListElements.module.css';
import ListItem from './ListItem';
import { Task } from '../types/types';

type ListElementsProps = {
  tasks: Task[];
  updateTasks: () => Promise<void>;
};

const ListElements: React.FC<ListElementsProps> = ({ tasks, updateTasks }) => {
  return (
    <ul className={classes.ul}>
      {tasks.map((task) => (
        <ListItem task={task} updateTasks={updateTasks} key={task.id} />
      ))}
    </ul>
  );
};

export default ListElements;
