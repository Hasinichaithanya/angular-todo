import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage-service';
import { TASK_STATUS_KEYS } from '../../constants/constants';
// interface NewTask {
//   description: string;
//   due_date: string;
//   due_time: string;
// }

@Component({
  selector: 'app-task-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-component.html',
  styleUrl: './task-form-component.scss',
})
export class TaskFormComponent {
  @Output() isTaskAdded = new EventEmitter();
  constructor(private ls: LocalStorageService) {}
  task = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      //  Validators.minLength(3)
    ]),
    description: new FormControl(
      ''
      //  Validators.required
    ),
    due_date: new FormControl(''),
    // status: new FormControl(TASK_STATUS_KEYS.TODO, Validators.required),
  });
  // updateValue(event: any, name: string) {
  //   // console.log(event.target?.value, name);
  // }

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
    // this.isTaskAdded.emit();
    this.task.reset();
  }
}
