export type Id = string;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export interface NewTask {
  _id: string;
  title: string;
  dueDate: string;
  description?: string;
  dueTime?: string;
  assigner: Assignee | null;
  assignees: Assignee[];
  priority: string;
  stage: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Assignee {
  _id: string;
  name: string;
}
