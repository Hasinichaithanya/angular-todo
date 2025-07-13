import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage-service';
import {
  LOCAL_STORAGE_KEYS,
  TASK_STATUS_KEYS,
} from '../../constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-task-component',
  imports: [ReactiveFormsModule],
  templateUrl: './update-task-component.html',
  styleUrl: './update-task-component.scss',
})
export class UpdateTaskComponent {
  task!: FormGroup;
  id: string = '';

  constructor(
    private ls: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.info('update component');
  }
  ngOnInit() {
    // this.updateValues();
  }
  // updateValues() {
  //   this.ls.getTasks().subscribe((response) => {
  //     console.info(response);
  //     this.activatedRoute.params.subscribe((resp) => (this.id = resp['id']));
  //     // let requestedTask = response.filter((task: any) => task.id === this.id);
  //     // requestedTask = requestedTask[0];
  //     // // console.log(this.task);

  //     // this.task = new FormGroup({
  //     //   title: new FormControl(requestedTask.title, [
  //     //     Validators.required,
  //     //     //  Validators.minLength(3)
  //     //   ]),
  //     //   description: new FormControl(
  //     //     requestedTask.description
  //     //     //  Validators.required
  //     //   ),
  //     //   due_date: new FormControl(requestedTask.due_date),
  //     //   status: new FormControl(requestedTask.status),
  //     // });
  //   });

  //   // console.log(this.task.value);
  // }

  handleSubmit() {
    let submittedTask = this.task.value;
    let newTask: any = {
      title: submittedTask.title,
      description: submittedTask.description,
      status: submittedTask.status,
    };
    if (submittedTask.due_date != '')
      newTask['due_date'] = submittedTask.due_date;
    // newTask['status'] = TASK_STATUS_KEYS.TODO;
    // newTask['id'] = self.crypto.randomUUID();
    this.ls.updateTasks(this.id, newTask);
    // console.log(newTask);
    // this.isTaskAdded.emit();
    this.task.reset();
    this.router.navigate(['']);
  }
}
