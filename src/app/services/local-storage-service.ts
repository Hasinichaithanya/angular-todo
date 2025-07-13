import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from '../constants/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task';

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
    // let locallyStored = localStorage.getItem(key);
    // let s = locallyStored ? JSON.parse(locallyStored) : [];
    return this.http
      .get<Task[]>(this.url)
      .subscribe((reponse) => this._tasksList.next(reponse));
    // this._tasksList.next(s);
  }

  addTasks(task: any) {
    // let locallyStored = this._tasksList.getValue();
    // locallyStored.push(task);
    // localStorage.setItem(
    //   LOCAL_STORAGE_KEYS.TASK_LIST_KEY,
    //   JSON.stringify(locallyStored)
    // );
    return this.http.post(this.url, task).subscribe((reponse) => {
      this.getTasks();
    });
    // this._tasksList.next(locallyStored);
  }

  updateTasks(id: string, task: any) {
    // let locallyStored = this._tasksList.getValue();
    // console.info(locallyStored, 33);
    // locallyStored = locallyStored.filter((task: any) => task.id != id);
    // locallyStored.unshift({ id, ...task });
    // localStorage.setItem(
    //   LOCAL_STORAGE_KEYS.TASK_LIST_KEY,
    //   JSON.stringify(locallyStored)
    // );
    // this._tasksList.next(locallyStored);
    return this.http
      .put(`${this.url}${id}`, task)
      .subscribe((response) => this.getTasks());
  }

  deleteTask(id: string) {
    // let tasks = this.getTasks(LOCAL_STORAGE_KEYS.TASK_LIST_KEY);
    // tasks = tasks.filter((task: any) => task.id != id);
    // localStorage.setItem(
    //   LOCAL_STORAGE_KEYS.TASK_LIST_KEY,
    //   JSON.stringify(tasks)
    // );
    // this._tasksList.next(tasks);
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
