export interface Comment {
  _id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

interface User {
  _id: string;
  name: string;
}

interface Task {
  _id: string;
  title: string;
}

export interface CommentResponse {
  _id: string;
content: string;
  author: User;
  task: Task;
  createdAt: string;
  updatedAt: string;
}
