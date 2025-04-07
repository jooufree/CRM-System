import { useState } from 'react';
import classes from './NavList.module.css';
import { TaskInfo } from '../todos';

type NavListProps = {
  updateTasks: (filter: string) => Promise<void>;
  tasksInfo: TaskInfo | undefined;
};

const NavList: React.FC<NavListProps> = ({ updateTasks, tasksInfo }) => {
  const [activeButton, setActiveButton] = useState<string>('all');

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
