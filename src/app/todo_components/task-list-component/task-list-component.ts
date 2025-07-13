import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LocalStorageService } from '../../services/todo-service';
import { LOCAL_STORAGE_KEYS } from '../../constants/constants';
import { TaskItemComponent } from '../task-item-component/task-item-component';
import { Task } from '../../interface/task';

@Component({
  selector: 'app-task-list-component',
  imports: [TaskItemComponent],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent {
  @Input() searchedTasks: Task[] | any;
  allTasks!: any;
  allactive: boolean = true;
  todoactive!: boolean;
  progressactive!: boolean;
  completedoactive!: boolean;
  activeTab: string = 'all';
  constructor(private cdf: ChangeDetectorRef) {
    console.info(this.searchedTasks);
  }

  ngOnChanges() {
    this.allTasks = this.searchedTasks;
    console.info(this.allTasks);
    console.info('on changes');
  }
  changeTab() {
    console.info('change tab', this.activeTab);
    // this.activeTab = tab;
    this.searchedTasks = this.allTasks;
    if (this.activeTab == 'all') {
      this.allactive = true;
      this.completedoactive = false;
      this.progressactive = false;
      this.todoactive = false;
      return this.searchedTasks;
    }
    this.searchedTasks = this.searchedTasks.filter(
      (task: Task) => task.status == this.activeTab
    );
    console.info(this.searchedTasks);

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
    this.changeTab();
  }
}
