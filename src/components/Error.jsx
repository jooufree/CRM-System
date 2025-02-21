import { Button, Space, Typography } from 'antd';
const { Paragraph } = Typography;
import classes from './Error.module.css';

export default function Error({ title, message, onConfirm }) {
  return (
    <Space className={classes.error}>
      <Typography.Title level={2}>{title}</Typography.Title>
      <Paragraph>{message}</Paragraph>
      {onConfirm && (
        <div id='confirmation-actions'>
          <Button
            color='danger'
            variant='solid'
            onClick={onConfirm}
            className='button'
          >
            Okay
          </Button>
        </div>
      )}
    </Space>
  );
}
