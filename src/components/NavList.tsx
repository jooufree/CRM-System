import { useState } from 'react';
import classes from './NavList.module.css';
import { Filter, TaskInfo } from '../types/types';

export type NavListProps = {
  updateTasks: (filter: Filter) => Promise<void>;
  tasksInfo: TaskInfo;
};

const NavList: React.FC<NavListProps> = ({ updateTasks, tasksInfo }) => {
  const [activeButton, setActiveButton] = useState<Filter>('all');

  return (
    <nav className={classes['nav-bar-area']}>
      <button
        type='button'
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
        Все задачи ({tasksInfo?.all})
      </button>
      <button
        type='button'
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
        В процессе ({tasksInfo?.inWork})
      </button>
      <button
        type='button'
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
        Сделано ({tasksInfo?.completed})
      </button>
    </nav>
  );
};

export default NavList;
