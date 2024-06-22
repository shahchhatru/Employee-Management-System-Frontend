import { Assignee } from "./kanban";

export interface Tasktype {
  _id: string;
  title: string;
  dueDate: string;
  description?: string;
  dueTime?: string;
  assigner: Assignee;
  assignees: Assignee[];
  priority: string;
  stage: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}


