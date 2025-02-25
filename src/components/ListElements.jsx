import { useState } from 'react';
import classes from './ListElements.module.css';
import {
  CheckOutlined,
  EditOutlined,
  RollbackOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export default function ListElements({
  tasks,
  handleDeleteTask,
  handleCheckedTask,
  handleEditTask,
  handleChangeTask,
  checkEditing,
  handleReturn,
}) {
  const [valueEditingTask, setValueEditingTask] = useState('');

  return (
    <Row gutter={[0, 16]} justify='center'>
      {tasks.map((task) =>
        checkEditing(task.id) ? (
          <Col span={24} className={classes.task} key={task.id}>
            <div className={`${classes['task-block']} ${classes.edited}`}>
              <Form initialValues={{ editingTask: valueEditingTask }}>
                <Form.Item
                  name='editingTask'
                  rules={[
                    { required: true, message: 'Поле обязательно!' },
                    {
                      min: 2,
                      message: 'Задача должна быть как минимум 2 символа!',
                    },
                    {
                      max: 64,
                      message: 'Задача должна быть не более 64 символов!',
                    },
                  ]}
                >
                  <TextArea
                    className={classes['edited-value']}
                    value={valueEditingTask}
                    onChange={(event) =>
                      setValueEditingTask(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                      }
                    }}
                    maxLength='64'
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
              </Form>
            </div>
            <div className={classes['button-block']}>
              <Button
                color='primary'
                variant='solid'
                className={`${classes.button} ${classes['confirm']}`}
                onClick={() => {
                  handleChangeTask(task.id, valueEditingTask);
                  setValueEditingTask('');
                }}
              >
                <CheckOutlined />
              </Button>
              <Button
                color='danger'
                variant='solid'
                className={`${classes.button} ${classes['return']}`}
                onClick={handleReturn}
              >
                <RollbackOutlined />
              </Button>
            </div>
          </Col>
        ) : (
          <Col span={24} className={classes.task} key={task.id}>
            <Checkbox
              onChange={() => handleCheckedTask(task.id, task.isDone)}
              checked={task.isDone}
              style={{ colorBorderfontSize: '20' }}
            />
            <div className={classes['task-block']}>
              {task.isDone ? <s>{task.title}</s> : task.title}
            </div>
            <div className={classes['button-block']}>
              <Button
                color='primary'
                variant='solid'
                className={`${classes.button} ${classes['edit']}`}
                onClick={() => {
                  handleEditTask(task.id);
                  setValueEditingTask(task.title);
                }}
              >
                <EditOutlined />
              </Button>
              <Button
                color='danger'
                variant='solid'
                className={`${classes.button} ${classes['delete']}`}
                onClick={() => handleDeleteTask(task.id)}
              >
                <CloseOutlined />
              </Button>
            </div>
          </Col>
        ),
      )}
    </Row>
  );
}
