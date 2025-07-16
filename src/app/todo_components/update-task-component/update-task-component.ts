import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Loader } from '../loader/loader';
import { TodoService } from '../../services/todo-service';
import { SnackbarService } from '../../services/snackbar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-task-component',
  imports: [ReactiveFormsModule, CommonModule, Loader],
  templateUrl: './update-task-component.html',
  styleUrl: './update-task-component.scss',
})
export class UpdateTaskComponent {
  task!: FormGroup;
  id: string = '';
  date: string;
  error: string = '';
  isLoading: boolean = true;
  constructor(
    private ls: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: SnackbarService
  ) {
    this.date = new Date().toISOString().split('T')[0];
    this.task = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(),
      due_date: new FormControl(''),
      status: new FormControl(''),
    });
  }
  ngOnInit() {
    this.updateValues();
  }
  updateValues() {
    this.activatedRoute.params.subscribe((response) => {
      this.id = response['id'];
      this.ls.getTaskById(this.id).subscribe(
        (response) => {
          let requestedTask = response;
          this.task.patchValue({
            title: response.title,
            description: requestedTask.description,
            due_date: requestedTask.due_date,
            status: requestedTask.status,
          });
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          // this.snackbar.showError(error);
          this.isLoading = false;
        }
      );
    });
  }

  handleSubmit() {
    let submittedTask = this.task.value;
    console.info(submittedTask);
    this.ls.updateTasks(this.id, submittedTask);
    this.task.reset();
    this.router.navigate(['']);
  }
}
