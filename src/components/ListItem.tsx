import React, { useState } from 'react';
import {
  updateUserTask,
  deleteUserTask,
  updateUserStatusTask,
} from '../api/http';
import { Task } from '../types/types';
import classes from './ListItem.module.css';

export type ListItemProps = {
  task: Task;
  updateTasks: () => Promise<void>;
};

const ListItem: React.FC<ListItemProps> = ({ task, updateTasks }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(task.title);

  function handleStartEdit() {
    setIsEditing(true);
  }

  async function handleChangeTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentValue || currentValue.length < 2) {
      alert('Длинна задачи не может быть короче 2 символов.');
      return;
    }

    await updateUserTask(task.id, currentValue);
    setIsEditing(false);
    await updateTasks();
  }

  function checkEditing() {
    return isEditing;
  }

  function handleReturn() {
    setIsEditing(false);
    setCurrentValue(task.title);
  }

  async function handleCheckedTask(id: number, isDone: boolean) {
    await updateUserStatusTask(id, !isDone);
    await updateTasks();
  }

  async function handleDeleteTask(id: number) {
    await deleteUserTask(id);
    await updateTasks();
  }

  return checkEditing() ? (
    <li className={classes.task}>
      <form className={classes['list-item-form']} onSubmit={handleChangeTask}>
        <div className={`${classes['task-block']} ${classes.edited}`}>
          <textarea
            className={classes['edited-value']}
            value={currentValue}
            onChange={(event) => setCurrentValue(event.target.value)}
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
            type='submit'
            className={`${classes.button} ${classes['confirm']}`}
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
      </form>
    </li>
  ) : (
    <li className={classes.task}>
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
          type='button'
          className={`${classes.button} ${classes['edit']}`}
          onClick={() => {
            handleStartEdit();
          }}
        >
          ✐
        </button>
        <button
          type='button'
          className={`${classes.button} ${classes['delete']}`}
          onClick={() => handleDeleteTask(task.id)}
        >
          ✖
        </button>
      </div>
    </li>
  );
};

export default ListItem;
