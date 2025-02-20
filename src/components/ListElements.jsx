import { useState } from 'react';
import classes from './ListElements.module.css';

export default function ListElements({
  tasks,
  handleDeleteTask,
  handleCheckedTask,
  handleEditTask,
  handleChangeTask,
  checkEditing,
  handleReturn,
}) {
  const [valueEditingTask, setValueEditingTask] = useState('');

  return (
    <ul className={classes.ul}>
      {tasks.map((task) =>
        checkEditing(task.id) ? (
          <li className={classes.task} key={task.id}>
            <div className={`${classes['task-block']} ${classes.edited}`}>
              <textarea
                className={classes['edited-value']}
                defaultValue={valueEditingTask}
                onChange={(event) => setValueEditingTask(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                  }
                }}
                maxLength='64'
              />
            </div>
            <div className={classes['button-block']}>
              <button
                className={`${classes.button} ${classes['confirm']}`}
                onClick={() => {
                  handleChangeTask(task.id, valueEditingTask);
                  setValueEditingTask('');
                }}
              >
                ✓
              </button>
              <button
                className={`${classes.button} ${classes['return']}`}
                onClick={handleReturn}
              >
                ↳
              </button>
            </div>
          </li>
        ) : (
          <li className={classes.task} key={task.id}>
            <input
              type='checkbox'
              onChange={() => handleCheckedTask(task.id, task.isDone)}
              checked={task.isDone}
            />
            <div className={classes['task-block']}>
              {task.isDone ? <s>{task.title}</s> : task.title}
            </div>
            <div className={classes['button-block']}>
              <button
                className={`${classes.button} ${classes['edit']}`}
                onClick={() => {
                  handleEditTask(task.id);
                  setValueEditingTask(task.title);
                }}
              >
                ✐
              </button>
              <button
                className={`${classes.button} ${classes['delete']}`}
                onClick={() => handleDeleteTask(task.id)}
              >
                ✖
              </button>
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
