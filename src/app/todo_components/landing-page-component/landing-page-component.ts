import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list-component/task-list-component';
import { SearchComponent } from '../search-component/search-component';
import { TaskFormComponent } from '../task-form-component/task-form-component';
import { Loader } from '../loader/loader';
import { TodoService } from '../../services/todo-service';
import { Task, UpdatedTask } from '../../interface/task';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-landing-page-component',
  imports: [
    CommonModule,
    TaskFormComponent,
    SearchComponent,
    TaskListComponent,
    Loader,
  ],
  templateUrl: './landing-page-component.html',
  styleUrl: './landing-page-component.scss',
})
export class LandingPageComponent {
  searchedTasksList: UpdatedTask[] = [];
  allTasks: UpdatedTask[] = [];
  allactive: boolean = true;
  todoactive!: boolean;
  progressactive!: boolean;
  completedoactive!: boolean;
  activeTab: string = 'all';
  searchedValue: string = '';
  error: string = '';
  isLoading: boolean = true;
  constructor(private ls: TodoService) {
    this.ls.errorMessage$.subscribe((response) => {
      console.log(response);
      this.error = response;
      if (response) {
        this.isLoading = false;
      }
    });
  }

  // todos$: Observable<UpdatedTask[]> = of([]);
  getTasksList() {
    this.ls.tasksList$.subscribe((response) => {
      console.log(response, 'hi');
      this.searchedTasksList = response;
      this.allTasks = response;
      if (response) {
        this.isLoading = false;
        console.log(this.isLoading);
      }
    });
    console.log('getTasks');
  }

  ngOnInit() {
    console.log('on init in landing page');
    this.getTasksList();
  }

  searchTasksFunc(value: string) {
    if (value == '') {
      this.searchedValue = '';
    }
    this.searchedValue = value;
    let filteredTasks = this.allTasks.filter(
      (task: Task) =>
        task.description.toLowerCase().includes(value.toLowerCase()) ||
        task.title.toLowerCase().includes(value.toLowerCase())
    );
    if (this.activeTab != 'all') {
      filteredTasks = filteredTasks.filter(
        (task) => task.status == this.activeTab
      );
    }
    this.searchedTasksList = filteredTasks;
  }

  changeTab(tab: string) {
    this.searchedTasksList = this.allTasks;
    if (this.activeTab == 'all') {
      this.allactive = true;
      this.completedoactive = false;
      this.progressactive = false;
      this.todoactive = false;
      // return
      this.searchedTasksList;
      return;
    }
    this.searchedTasksList = this.allTasks.filter(
      (task: UpdatedTask) => task.status == this.activeTab
    );
    // console.log(this.searchedTasksList);
    if (this.activeTab == 'to-do') {
      this.todoactive = true;
      this.allactive = false;
      this.completedoactive = false;
      this.progressactive = false;
    } else if (this.activeTab == 'in-progress') {
      this.progressactive = true;
      this.allactive = false;
      this.completedoactive = false;
      this.todoactive = false;
    } else if (this.activeTab == 'completed') {
      this.completedoactive = true;
      this.allactive = false;
      this.progressactive = false;
      this.todoactive = false;
    }
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.changeTab(tab);
    this.searchTasksFunc(this.searchedValue);
  }
  taskAdded() {
    this.setActiveTab('all');
  }
}
