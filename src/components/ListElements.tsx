import classes from './ListElements.module.css';
import ListItem from './ListItem';
import { Task } from '../todos';

type ListElementsProps = {
  tasks: Task[];
  updateTasks: (filter: string) => Promise<void>;
  taskFilter: string;
};

const ListElements: React.FC<ListElementsProps> = ({
  tasks,
  updateTasks,
  taskFilter,
}) => {
  return (
    <ul className={classes.ul}>
      <ListItem
        tasks={tasks}
        updateTasks={updateTasks}
        taskFilter={taskFilter}
      />
    </ul>
  );
};

export default ListElements;
