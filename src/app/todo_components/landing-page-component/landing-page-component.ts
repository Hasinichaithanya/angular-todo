import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { TaskListComponent } from '../task-list-component/task-list-component';
import { SearchComponent } from '../search-component/search-component';
import { TaskFormComponent } from '../task-form-component/task-form-component';
import { LocalStorageService } from '../../services/todo-service';
import { Task } from '../../interface/task';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-landing-page-component',
  imports: [
    CommonModule,
    TaskFormComponent,
    SearchComponent,
    TaskListComponent,
  ],
  templateUrl: './landing-page-component.html',
  styleUrl: './landing-page-component.scss',
})
export class LandingPageComponent {
  // tasks!: Task[];
  todoTasks: any;
  completedTasks: any;
  inProgressTasks: any;
  searchedTasksList: Task[] = [];

  constructor(
    private ls: LocalStorageService,
    private ngZone: NgZone,
    private cdf: ChangeDetectorRef
  ) {}

  getTasksList() {
    this.ls.tasksList$.subscribe((response) => {
      console.info(response);
      this.ngZone.runTask(() => (this.searchedTasksList = [...response]));
      this.cdf.detectChanges();
    });
  }

  ngOnInit() {
    this.ngZone.run(() => this.getTasksList());
  }

  searchedTasksFunc(event: any) {
    this.searchedTasksList = event;
  }
}
