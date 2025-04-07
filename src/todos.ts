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
