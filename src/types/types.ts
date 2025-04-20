export type TaskInfo = {
  all: number;
  inWork: number;
  completed: number;
};

export type Task = {
  created: string;
  id: number;
  isDone: boolean;
  title: string;
};

export type ErrorProps = {
  title: string;
  message: string;
  onConfirm?: () => Promise<void>;
};

export type InputAreaProps = {
  updateTasks: () => Promise<void>;
};

export type ListElementsProps = {
  tasks: Task[];
  updateTasks: () => Promise<void>;
};

export type ListItemProps = {
  task: Task;
  updateTasks: () => Promise<void>;
};

export type Filter = 'all' | 'completed' | 'inWork';

export type NavListProps = {
  updateTasks: (filter: Filter) => Promise<void>;
  tasksInfo: TaskInfo;
};

export type ErrorType = {
  message: string;
};

export type MetaResponse<T, N> = {
  data: T[];
  info: N;
  meta: {
    totalAmount: number;
  };
};
