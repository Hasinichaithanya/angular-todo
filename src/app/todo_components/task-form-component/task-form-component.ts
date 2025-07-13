import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/todo-service';
import { TASK_STATUS_KEYS } from '../../constants/constants';

@Component({
  selector: 'app-task-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-component.html',
  styleUrl: './task-form-component.scss',
})
export class TaskFormComponent {
  date: string = '';
  constructor(private ls: LocalStorageService) {
    this.date = new Date().toISOString().split('T')[0];
    // console.log(new Date().toISOString());
  }
  task = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', Validators.required),
    due_date: new FormControl(''),
    // status: new FormControl(TASK_STATUS_KEYS.TODO, Validators.required),
  });

  handleSubmit() {
    let submittedTask = this.task.value;
    let newTask: any = {
      title: submittedTask.title,
      description: submittedTask.description,
      status: TASK_STATUS_KEYS.TODO,
    };
    if (submittedTask.due_date != '')
      newTask['due_date'] = submittedTask.due_date;
    // newTask['status'] = TASK_STATUS_KEYS.TODO;
    // newTask['id'] = self.crypto.randomUUID();
    this.ls.addTasks(newTask);
    this.task.reset();
  }
}
