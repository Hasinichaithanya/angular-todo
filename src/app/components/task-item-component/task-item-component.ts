import {
  Component,
  Input,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage-service';
import { LOCAL_STORAGE_KEYS } from '../../constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-item-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item-component.html',
  styleUrl: './task-item-component.scss',
})
export class TaskItemComponent implements OnChanges {
  // @Input() taskDetails: any = '';
  @Input() activeTab: string = '';
  @Input() searchedTasks: any[] = [];
  constructor(private ls: LocalStorageService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.info(this.activeTab, changes, 'task-item-comp');

    if (changes['searchedTasks'] && this.activeTab != 'all') {
      this.searchedTasks = this.searchedTasks.filter(
        (val: any) => val.status == this.activeTab
      );
    }
  }

  onDelete(id: string) {
    this.ls.deleteTask(id);
    // this.ls.getTasks(LOCAL_STORAGE_KEYS.TASK_LIST_KEY);
    // this.ls.getTasks();
    console.info('Delete button is cliked', id);
  }
  onUpdate(id: string) {
    // console.log('update clicked', id);
    this.router.navigate(['/update-task', id]);
  }
}
