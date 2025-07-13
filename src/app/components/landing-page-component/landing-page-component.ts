import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from '../task-list-component/task-list-component';
import { SearchComponent } from '../search-component/search-component';
import { TaskFormComponent } from '../task-form-component/task-form-component';
import { LocalStorageService } from '../../services/local-storage-service';
import {
  LOCAL_STORAGE_KEYS,
  TASK_STATUS_KEYS,
} from '../../constants/constants';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-landing-page-component',
  // imports: [],
  imports: [
    CommonModule,
    TaskFormComponent,
    SearchComponent,
    // RouterOutlet,
    TaskListComponent,
  ],
  templateUrl: './landing-page-component.html',
  styleUrl: './landing-page-component.scss',
})
export class LandingPageComponent {
  tasks: any;
  todoTasks: any;
  completedTasks: any;
  inProgressTasks: any;
  searchedTasksList!: any[];

  constructor(
    private ls: LocalStorageService,
    private ngZone: NgZone,
    private cdf: ChangeDetectorRef
  ) {
    // this.getTasks();
  }

  getTasksList() {
    // this.tasks = this.ls.getTasks(LOCAL_STORAGE_KEYS.TASK_LIST_KEY);
    this.ls.tasksList$.subscribe((response) => {
      this.tasks = response;
      console.info(response);
    });
  }

  ngOnInit() {
    this.getTasksList();

    // console.info(NgZone.isInAngularZone());
    // this.todoTasks = this.tasks.filter(
    //   (task: any) => task.status == TASK_STATUS_KEYS.TODO
    // );
    // this.completedTasks = this.tasks.filter(
    //   (task: any) => (task.status = TASK_STATUS_KEYS.COMPLETED)
    // );
    // this.inProgressTasks = this.tasks.filter(
    //   (task: any) => (task.status = TASK_STATUS_KEYS.IN_PROGRESS)
    // );
  }

  // ngDoCheck() {
  //   // console.log('ngDoCheck');
  //   this.getTasks();
  // }

  searchedTasksFunc(event: any) {
    // console.log(event);
    this.searchedTasksList = event;
  }

  taskAdded() {
    this.getTasksList();
  }
}
