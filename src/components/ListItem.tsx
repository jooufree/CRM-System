import React, { useState } from 'react';
import {
  updateUserTask,
  deleteUserTask,
  updateUserStatusTask,
} from '../api/http';
import { Task, FormValue } from '../types/types';
import classes from './ListItem.module.css';
import { Button, Checkbox, Space, Typography, Form, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  RollbackOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

type ListItemProps = {
  task: Task;
  updateTasks: () => Promise<void>;
};

const ListItem: React.FC<ListItemProps> = ({ task, updateTasks }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm<FormValue>();

  const handleStartEdit = () => {
    form.setFieldsValue({ value: task.title });
    setIsEditing(true);
  };

  const handleReturn = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleChangeTask = async (formValue: FormValue) => {
    if (!formValue.value || formValue.value.length < 2) return;
    await updateUserTask(task.id, formValue.value);
    setIsEditing(false);
    message.success('Задача обновлена');
    await updateTasks();
  };

  const handleCheckedTask = async () => {
    await updateUserStatusTask(task.id, !task.isDone);
    await updateTasks();
  };

  const handleDeleteTask = async () => {
    await deleteUserTask(task.id);
    message.success('Задача удалена');
    await updateTasks();
  };

  return (
    <div className={classes.task}>
      {isEditing ? (
        <div className={`${classes['task-block']} ${classes.edited}`}>
          <Form form={form} onFinish={handleChangeTask} layout='inline'>
            <Form.Item
              name='value'
              rules={[
                { required: true, message: 'Поле обязательно!' },
                { min: 2, message: 'Минимум 2 символа' },
                { max: 64, message: 'Максимум 64 символа' },
              ]}
              style={{ flexGrow: 1, marginRight: '1rem' }}
            >
              <TextArea
                onPressEnter={(event) => {
                  event.preventDefault();
                  form.submit();
                }}
                maxLength={64}
                autoSize={{ maxRows: 3 }}
                style={{
                  width: '100%',
                  maxHeight: '80%',
                  padding: '0',
                  margin: '0',
                  border: '1px solid transparent',
                  borderBottom: '2px solid #88878745',
                  borderRadius: '0',
                  backgroundColor: 'transparent',
                  outline: 'none',
                }}
              />
            </Form.Item>
            <Space className={classes['button-block']}>
              <Button
                htmlType='submit'
                icon={<CheckOutlined />}
                color='primary'
                variant='solid'
              />
              <Button
                color='danger'
                variant='solid'
                onClick={handleReturn}
                icon={<RollbackOutlined />}
              />
            </Space>
          </Form>
        </div>
      ) : (
        <>
          <Checkbox checked={task.isDone} onChange={handleCheckedTask} />
          <Text
            key={`${task.id}-${task.isDone}`}
            delete={task.isDone}
            style={{ flexGrow: 1, marginLeft: '0.5rem', marginRight: '0.5rem' }}
          >
            {task.title}
          </Text>
          <Space>
            <Button
              color='primary'
              variant='solid'
              icon={<EditOutlined />}
              onClick={handleStartEdit}
            />
            <Button
              color='danger'
              variant='solid'
              icon={<DeleteOutlined />}
              onClick={handleDeleteTask}
            />
          </Space>
        </>
      )}
    </div>
  );
};

export default ListItem;
