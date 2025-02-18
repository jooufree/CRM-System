import classes from './InputArea.module.css';

export default function InputArea({ handleChange, inputValue, setInputValue }) {
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
        onClick={() => handleChange(inputValue)}
      >
        Add
      </button>
    </section>
  );
}
