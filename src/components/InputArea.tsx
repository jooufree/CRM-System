import { createUserTask } from '../api/http';
import { Button, Form, Input, message } from 'antd';
import classes from './InputArea.module.css';
import { FormValue } from '../types/types';

type InputAreaProps = {
  updateTasks: () => Promise<void>;
};

const InputArea: React.FC<InputAreaProps> = ({ updateTasks }) => {
  const [form] = Form.useForm<FormValue>();

  const onFinish = async (formValue: FormValue) => {
    message.success({
      content: 'Задача успешно добавлена!',
      duration: 2,
    });
    await createUserTask(formValue.value);
    form.resetFields();
    await updateTasks();
  };

  const onFinishFailed = () => {
    message.error('Введите корректную задачу!');
  };

  return (
    <Form
      className={classes['input-area']}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='value'
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
};

export default InputArea;
