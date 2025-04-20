import React, { useState, useRef } from 'react';
import {
  updateUserTask,
  deleteUserTask,
  updateUserStatusTask,
} from '../api/http';
import { ListItemProps } from '../types/types';
import classes from './ListItem.module.css';

const ListItem: React.FC<ListItemProps> = ({ task, updateTasks }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleEditTask() {
    setIsEditing(true);
  }

  async function handleChangeTask() {
    const title: string | undefined = textareaRef.current?.value.trim();
    if (!title || title.length < 2) {
      alert('Длинна задачи не может быть короче 2 символов.');
      return;
    }
    await updateUserTask(task.id, title);
    setIsEditing(false);
    await updateTasks();
  }

  function checkEditing() {
    return isEditing;
  }

  function handleReturn() {
    setIsEditing(false);
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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleChangeTask();
      }}
    >
      <li className={classes.task}>
        <div className={`${classes['task-block']} ${classes.edited}`}>
          <textarea
            ref={textareaRef}
            className={classes['edited-value']}
            defaultValue={task.title}
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
      </li>
    </form>
  ) : (
    <li className={classes.task}>
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
            handleEditTask();
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
  );
};

export default ListItem;
