import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TaskItemComponent } from '../task-item-component/task-item-component';
import { Task, UpdatedTask } from '../../interface/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list-component',
  imports: [TaskItemComponent, CommonModule],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.scss',
})
export class TaskListComponent {
  @Input() searchedTasks!: UpdatedTask[] | [];
  allTasks!: UpdatedTask[];
}
