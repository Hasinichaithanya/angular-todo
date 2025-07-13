import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/todo-service';
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
    // console.log('update component');
    this.task = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(),
      // '' //  Validators.required
      due_date: new FormControl(''),
      status: new FormControl(''),
    });
    // this.updateValues();
  }
  ngOnInit() {
    this.updateValues();
  }
  updateValues() {
    this.activatedRoute.params.subscribe((response) => {
      this.id = response['id'];
      this.ls.getTaskById(this.id).subscribe((response) => {
        let requestedTask = response;
        this.task.patchValue({
          title: response.title,
          description: requestedTask.description,
          due_date: requestedTask.due_date,
          status: requestedTask.status,
        });

        console.info(response);
      });
    });
  }

  handleSubmit() {
    let submittedTask = this.task.value;
    console.info(submittedTask);
    this.ls.updateTasks(this.id, submittedTask);
    // this.isTaskAdded.emit();
    this.task.reset();
    this.router.navigate(['']);
  }
}
