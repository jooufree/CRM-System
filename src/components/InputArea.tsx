import { createUserTask } from '../api/http';
import { useState } from 'react';
import classes from './InputArea.module.css';

type InputAreaProps = {
  updateTasks: (filter: string) => Promise<void>;
  taskFilter: string;
};

const InputArea: React.FC<InputAreaProps> = ({ updateTasks, taskFilter }) => {
  const [inputValue, setInputValue] = useState<string>('');

  async function handleAddTask() {
    if (inputValue.length > 1 && inputValue.length < 65) {
      await createUserTask(inputValue); // можно и так
      setInputValue('');
      await updateTasks(taskFilter);
    } else if (inputValue.length < 2) {
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
        maxLength={64}
      />
      <button className={classes.button} onClick={handleAddTask}>
        Add
      </button>
    </section>
  );
};

export default InputArea;
