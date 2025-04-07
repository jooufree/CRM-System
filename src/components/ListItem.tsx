import { useState } from 'react';
import {
  updateUserTask,
  deleteUserTask,
  updateUserStatusTask,
} from '../api/http';
import { Task } from '../todos';
import classes from './ListItem.module.css';

type ListItemProps = {
  tasks: Task[];
  updateTasks: (filter: string) => Promise<void>;
  taskFilter: string;
};

type EditingTask = {
  id: number | null;
};

const ListItem: React.FC<ListItemProps> = ({
  tasks,
  updateTasks,
  taskFilter,
}) => {
  const [valueEditingTask, setValueEditingTask] = useState<string>('');
  const [isEditing, setIsEditing] = useState<EditingTask>({ id: null });

  function handleEditTask(id: number) {
    setIsEditing({ id });
  }

  async function handleChangeTask(id: number, title: string) {
    if (title.length < 2) {
      alert('Длинна задачи не может быть короче 2 символов.');
      return;
    }
    await updateUserTask(id, title);
    setIsEditing({ id: null });
    await updateTasks(taskFilter);
  }

  function checkEditing(id: number) {
    return id === isEditing.id;
  }

  function handleReturn() {
    setIsEditing({ id: null });
  }

  async function handleCheckedTask(id: number, isDone: boolean) {
    await updateUserStatusTask(id, isDone);
    await updateTasks(taskFilter);
  }

  async function handleDeleteTask(id: number) {
    await deleteUserTask(id);
    await updateTasks(taskFilter);
  }

  return tasks.map((task) =>
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
            maxLength={64}
          />
        </div>
        <div className={classes['button-block']}>
          <button
            type='button'
            className={`${classes.button} ${classes['confirm']}`}
            onClick={() => {
              handleChangeTask(task.id, valueEditingTask);
              setValueEditingTask('');
            }}
          >
            ✓
          </button>
          <button
            type='button'
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
          onChange={async () => await handleCheckedTask(task.id, task.isDone)}
          checked={task.isDone}
        />
        <div className={classes['task-block']}>
          {task.isDone ? <s>{task.title}</s> : task.title}
        </div>
        <div className={classes['button-block']}>
          <button
            type='button'
            className={`${classes.button} ${classes['edit']}`}
            onClick={() => {
              handleEditTask(task.id);
              setValueEditingTask(task.title);
            }}
          >
            ✐
          </button>
          <button
            type='button'
            className={`${classes.button} ${classes['delete']}`}
            onClick={async () => await handleDeleteTask(task.id)}
          >
            ✖
          </button>
        </div>
      </li>
    ),
  );
};

export default ListItem;
