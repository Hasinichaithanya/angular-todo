import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage-service';
import { LOCAL_STORAGE_KEYS } from '../../constants/constants';
import { TaskItemComponent } from '../task-item-component/task-item-component';

@Component({
  selector: 'app-task-list-component',
  imports: [TaskItemComponent],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent {
  @Input() searchedTasks: any;
  allactive: boolean = true;
  todoactive!: boolean;
  progressactive!: boolean;
  completedoactive!: boolean;
  activeTab: string = 'all';
  constructor(private cdf: ChangeDetectorRef) {
    this.changeTab('all');
  }
  changeTab(tab: string) {
    // console.log('change tab');
    this.activeTab = tab;
    if (tab == 'all') {
      this.allactive = true;
      this.completedoactive = false;
      this.progressactive = false;
      this.todoactive = false;
      return this.searchedTasks;
    }
    this.searchedTasks = this.searchedTasks;
    if (tab == 'to-do') {
      this.todoactive = true;
      this.allactive = false;
      this.completedoactive = false;
      this.progressactive = false;
    } else if (tab == 'in-progress') {
      this.progressactive = true;
      this.allactive = false;
      this.completedoactive = false;
      this.todoactive = false;
    } else if (tab == 'completed') {
      this.completedoactive = true;
      this.allactive = false;
      this.progressactive = false;
      this.todoactive = false;
    }

    // this.searchedTasks = this.searchedTasks.filter(
    //   (task: any) => {
    //     return task.status == 'completed'
    //   }
    // );
    // console.info(this.searchedTasks);
  }
}
