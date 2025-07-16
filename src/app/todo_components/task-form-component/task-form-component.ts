import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { Task } from '../../interface/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form-component.html',
  styleUrl: './task-form-component.scss',
})
export class TaskFormComponent {
  date: string = '';
  error: string = '';
  @Output() isTaskAdded = new EventEmitter();
  constructor(private ls: TodoService) {
    this.date = new Date().toISOString().split('T')[0];
  }
  task = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', Validators.required),
    due_date: new FormControl(''),
    // status: new FormControl(TASK_STATUS_KEYS.TODO, Validators.required),
  });

  handleSubmit() {
    let submittedTask = this.task.value;
    let newTask: Task = {
      title: submittedTask.title || '',
      description: submittedTask.description || '',
      status: 'to-do',
    };
    if (submittedTask.due_date != '')
      newTask['due_date'] = submittedTask.due_date || '';
    // newTask['status'] = TASK_STATUS_KEYS.TODO;
    // newTask['id'] = self.crypto.randomUUID();
    this.ls.addTasks(newTask);
    this.ls.errorMessage$.subscribe((response) => {
      if (response) {
        this.error = 'Could not add task, try again!';
      }
    });
    this.isTaskAdded.emit();
    this.task.reset();
  }
}
