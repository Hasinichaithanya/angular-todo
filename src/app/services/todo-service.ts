import { Injectable } from '@angular/core';
// import { takeUntilDestroyed, } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  Subject,
  throwError,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task, UpdatedTask } from '../interface/task';
// import { filter, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _tasksList: Subject<UpdatedTask[]> = new Subject<UpdatedTask[]>();
  tasksList$: Observable<UpdatedTask[]> = this._tasksList.asObservable();
  private _errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  errorMessage$: Observable<string> = this._errorMessage.asObservable();
  url: string = 'http://localhost:3000/tasks/';
  constructor(private http: HttpClient) {
    this.handleError = this.handleError.bind(this);
    this.getTasks();
  }

  private handleError(error: HttpErrorResponse) {
    let errMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errMessage = `${error.error.message}`;
    } else {
      errMessage = `${error.statusText} occured, try again!`;
    }
    this._errorMessage.next(errMessage);
    // console.error(errMessage);
    return throwError(() => new Error(errMessage));
  }

  getTasks() {
    this.http
      .get<UpdatedTask[]>(this.url)
      .pipe(retry(2), catchError(this.handleError))
      .subscribe((response) => {
        // console.log(response);
        this._tasksList.next(response);
      });
  }

  getTaskById(id: string) {
    return this.http
      .get<UpdatedTask>(`${this.url}${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  addTasks(task: Task) {
    this.http
      .post(this.url, task)
      .pipe(retry(2), catchError(this.handleError))
      .subscribe((reponse) => {
        this.getTasks();
      });
  }

  updateTasks(id: string, task: Task) {
    this.http
      .put(`${this.url}${id}`, task)
      .pipe(retry(2), catchError(this.handleError))

      .subscribe((response) => this.getTasks());
  }

  deleteTask(id: string) {
    this.http
      .delete(`${this.url}${id}`)

      .pipe(retry(2), catchError(this.handleError))
      .subscribe((resp) => this.getTasks());
  }
}
