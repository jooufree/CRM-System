import classes from './NavList.module.css';
import { NavLink } from 'react-router';

export default function NavList({ tasksInfo }) {
  return (
    <nav className={classes['nav-bar-area']}>
      <NavLink
        to='/'
        end
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        Все задачи ({tasksInfo.all})
      </NavLink>
      <NavLink
        to='/process'
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        В прогрессе ({tasksInfo.inWork})
      </NavLink>
      <NavLink
        to='/done'
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        Сделано ({tasksInfo.completed})
      </NavLink>
    </nav>
  );
}
