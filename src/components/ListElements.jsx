import { useState } from 'react';
import classes from './ListElements.module.css';
import {
  CheckOutlined,
  EditOutlined,
  RollbackOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';

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
              <Button
                color='primary'
                variant='solid'
                className={`${classes.button} ${classes['confirm']}`}
                onClick={() => {
                  handleChangeTask(task.id, valueEditingTask);
                  setValueEditingTask('');
                }}
              >
                <CheckOutlined />
              </Button>
              <Button
                color='danger'
                variant='solid'
                className={`${classes.button} ${classes['return']}`}
                onClick={handleReturn}
              >
                <RollbackOutlined />
              </Button>
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
              <Button
                color='primary'
                variant='solid'
                className={`${classes.button} ${classes['edit']}`}
                onClick={() => {
                  handleEditTask(task.id);
                  setValueEditingTask(task.title);
                }}
              >
                <EditOutlined />
              </Button>
              <Button
                color='danger'
                variant='solid'
                className={`${classes.button} ${classes['delete']}`}
                onClick={() => handleDeleteTask(task.id)}
              >
                <CloseOutlined />
              </Button>
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
