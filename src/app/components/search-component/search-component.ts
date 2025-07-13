import { Component, output, input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage-service';
import { LOCAL_STORAGE_KEYS } from '../../constants/constants';

@Component({
  selector: 'app-search-component',
  imports: [],
  templateUrl: './search-component.html',
  styleUrl: './search-component.scss',
})
export class SearchComponent {
  searchedTasks = output();
  tasksList: any;
  constructor(private ls: LocalStorageService) {
    this.tasksList = this.ls.getTasks();
  }

  searchTasks(search: any) {
    let value: string = search.target.value;
    this.searchedTasks.emit(
      // this.tasksList.filter((task: any) =>
      //   task.title.toLowerCase().includes(value.toLowerCase())
      // ) ||
      this.tasksList.filter(
        (task: any) =>
          task.description.toLowerCase().includes(value.toLowerCase()) ||
          task.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  }
}
