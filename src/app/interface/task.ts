export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'to-do' | 'in-progress';
  due_date: string;
}
