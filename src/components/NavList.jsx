import { useState } from 'react';
import classes from './NavList.module.css';

export default function NavList({ updateTasks, tasksInfo }) {
  const [activeButton, setActiveButton] = useState('all');

  return (
    <nav className={classes['nav-bar-area']}>
      <button
        className={
          activeButton === 'all'
            ? `${classes.button} ${classes.active} `
            : classes.button
        }
        onClick={async () => {
          setActiveButton('all');
          await updateTasks('all');
        }}
      >
        Все задачи ({tasksInfo.all})
      </button>
      <button
        className={
          activeButton === 'inWork'
            ? `${classes.button} ${classes.active} `
            : classes.button
        }
        onClick={async () => {
          setActiveButton('inWork');
          await updateTasks('inWork');
        }}
      >
        В процессе ({tasksInfo.inWork})
      </button>
      <button
        className={
          activeButton === 'completed'
            ? `${classes.button} ${classes.active} `
            : classes.button
        }
        onClick={async () => {
          setActiveButton('completed');
          await updateTasks('completed');
        }}
      >
        Сделано ({tasksInfo.completed})
      </button>
    </nav>
  );
}
