import classes from './NavList.module.css';
import { NavLink } from 'react-router';

export default function NavList({ children }) {
  return (
    <nav className={classes['nav-bar-area']}>
      <NavLink
        to='/'
        end
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        Все задачи
      </NavLink>
      <NavLink
        to='/process'
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        В прогрессе
      </NavLink>
      <NavLink
        to='/done'
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        Сделано
      </NavLink>
    </nav>
  );
}
