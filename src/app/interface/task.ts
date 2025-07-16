export interface Task {
  title: string;
  description: string;
  status: 'completed' | 'to-do' | 'in-progress';
  due_date?: string;
}
export interface UpdatedTask {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'to-do' | 'in-progress';
  due_date?: string;
}
