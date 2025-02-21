import { Button, Input, Space } from 'antd';
import classes from './InputArea.module.css';

export default function InputArea({ handleChange, inputValue, setInputValue }) {
  return (
    <Space className={classes['input-area']}>
      <Input
        className={classes.input}
        type='text'
        placeholder='Task To Be Done...'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        variant='underlined'
        required
      />
      <Button
        type='primary'
        className={classes.button}
        onClick={() => handleChange(inputValue)}
      >
        Add
      </Button>
    </Space>
  );
}
