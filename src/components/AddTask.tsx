import { createTask } from '../api/tasks';
import { Button, Form, Input, message } from 'antd';
import classes from './AddTask.module.css';
import { TaskInputValue } from '../types/types';
import { MAX_LENGTH_TASK, MIN_LENGTH_TASK } from '../constants/constants';

type AddTaskProps = {
  updateTasks: () => Promise<void>;
};

const AddTask: React.FC<AddTaskProps> = ({ updateTasks }) => {
  const [form] = Form.useForm<TaskInputValue>();

  const onFinish = async (formValue: TaskInputValue) => {
    message.success({
      content: 'Задача успешно добавлена!',
      duration: 2,
    });
    await createTask(formValue.value);
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
          {
            min: MIN_LENGTH_TASK,
            message: `Задача должна быть как минимум ${MIN_LENGTH_TASK} символа!`,
          },
          {
            max: MAX_LENGTH_TASK,
            message: `Задача должна быть не более ${MAX_LENGTH_TASK} символов!`,
          },
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

export default AddTask;
