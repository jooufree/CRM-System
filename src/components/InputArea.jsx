import classes from './InputArea.module.css';
import { useState } from 'react';
import { updateUserPlaces } from '../http';

export default function InputArea() {
  const [inputValue, setInputValue] = useState('');

  function handleAddTask(value) {
    if (value.length > 1 && value.length < 65) {
      updateUserPlaces(value);
      setInputValue('');
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
        onClick={() => handleAddTask(inputValue)}
      >
        Add
      </button>
    </section>
  );
}
