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

// export type TaskFilter = 'all' | 'completed' | 'inWork';
export enum TaskFilter {
  All = 'all',
  Completed = 'completed',
  InWork = 'inWork',
}

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

export type TaskInputValue = {
  value: string;
};
