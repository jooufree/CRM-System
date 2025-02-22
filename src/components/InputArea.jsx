import { Button, Form, Input, message } from 'antd';
import classes from './InputArea.module.css';

export default function InputArea({ handleChange, inputValue }) {
  const onFinish = () => {
    message.success('Задача успешно добавлена!');
    const { task } = inputValue.getFieldsValue();
    handleChange(task);
  };

  const onFinishFailed = () => {
    message.error('Введите корректную задачу!');
  };

  return (
    <Form
      className={classes['input-area']}
      form={inputValue}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='task'
        rules={[
          { required: true, message: 'Поле обязательно!' },
          { min: 2, message: 'Задача должна быть как минимум 2 символа!' },
          { max: 64, message: 'Задача должна быть не более 64 символов!' },
        ]}
      >
        <Input
          style={{
            height: '2.5rem',
            width: '20rem',
            background: 'transparent',
          }}
          type='text'
          placeholder='Task To Be Done...'
          variant='underlined'
        />
      </Form.Item>
      <Button type='primary' className={classes.button} htmlType='submit'>
        Add
      </Button>
    </Form>
  );
}
