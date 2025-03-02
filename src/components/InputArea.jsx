import { createUserTask } from '../api/http';
import { useState } from 'react';
import classes from './InputArea.module.css';

export default function InputArea({ updateTasks, taskFilter }) {
  const [inputValue, setInputValue] = useState('');

  async function handleAddTask(value) {
    if (value.length > 1 && value.length < 65) {
      await createUserTask(value);
      setInputValue('');
      await updateTasks(taskFilter);
    } else if (value.length < 2) {
      alert('Задача должна состоять минимум из 2 символов!');
    }
  }

  return (
    <section className={classes['input-area']}>
      <input
        className={classes.input}
        type='text'
        placeholder='Task To Be Done...'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        required
        maxLength='64'
      />
      <button
        className={classes.button}
        onClick={async () => await handleAddTask(inputValue)}
      >
        Add
      </button>
    </section>
  );
}
