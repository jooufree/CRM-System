import classes from './ListElements.module.css';
import ListItem from './ListItem';

export default function ListElements({ tasks, updateTasks, taskFilter }) {
  return (
    <ul className={classes.ul}>
      <ListItem
        tasks={tasks}
        updateTasks={updateTasks}
        taskFilter={taskFilter}
      />
    </ul>
  );
}
