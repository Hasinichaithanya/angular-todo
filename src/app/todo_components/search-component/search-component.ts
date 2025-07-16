import { Component, output, input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { LOCAL_STORAGE_KEYS } from '../../constants/constants';
import { Task } from '../../interface/task';

@Component({
  selector: 'app-search-component',
  imports: [],
  templateUrl: './search-component.html',
  styleUrl: './search-component.scss',
})
export class SearchComponent {
  @Output() searchedValue = new EventEmitter<string>();
  tasksList: Task[] = [];
  constructor(private ls: TodoService) {
    this.ls.tasksList$.subscribe((resp) => (this.tasksList = resp));
  }
  searchTasks(search: Event) {
    let value: string = (search.target as HTMLInputElement).value;
    this.searchedValue.emit(value);
  }
  emitEmpty(search: Event) {
    console.log('on close');
    this.searchedValue.emit('');
  }
}
