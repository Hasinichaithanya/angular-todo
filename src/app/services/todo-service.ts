import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from '../constants/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interface/task';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  _tasksList: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasksList$: Observable<Task[]> = this._tasksList.asObservable();
  url: string = 'http://localhost:3000/tasks/';
  constructor(private http: HttpClient) {
    this.getTasks();
  }

  getTasks() {
    // console.log('this.getTasks()');
    return this.http
      .get<Task[]>(this.url)
      .subscribe((response) => this._tasksList.next(response));
  }

  getTaskById(id: string) {
    return this.http.get<Task>(`${this.url}${id}`);
  }

  addTasks(task: any) {
    return this.http.post(this.url, task).subscribe((reponse) => {
      this.getTasks();
    });
  }

  updateTasks(id: string, task: any) {
    return this.http
      .put(`${this.url}${id}`, task)
      .subscribe((response) => this.getTasks());
  }

  deleteTask(id: string) {
    console.info(`${this.url}:${id}`);
    return this.http
      .delete(`${this.url}${id}`)
      .subscribe((resp) => this.getTasks());
  }

  deleteAllTasks() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TASK_LIST_KEY);
    this._tasksList.next([]);
  }
}
