import classes from './ListElements.module.css';

export default function ListElements({ tasks }) {
  return (
    <>
      {tasks.map((task, taskIndex) => (
        <div className={classes.task} key={taskIndex}>
          <div className={classes['task-block']}>{task.title}</div>
          <div className={classes['button-block']}>
            <button className={`${classes.button} ${classes['edit']}`}>
              ✐
            </button>
            <button className={`${classes.button} ${classes['delete']}`}>
              ✖
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
