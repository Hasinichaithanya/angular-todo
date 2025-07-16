import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo-service';
import { Router } from '@angular/router';
import { Task, UpdatedTask } from '../../interface/task';
import { SnackbarService } from '../../services/snackbar';
import { MatDialog } from '@angular/material/dialog';
import { DialogBox } from '../dialog-box/dialog-box';
@Component({
  selector: 'app-task-item-component',
  // standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item-component.html',
  styleUrl: './task-item-component.scss',
})
export class TaskItemComponent {
  @Input() task!: UpdatedTask;
  error: string = '';
  constructor(
    private ls: TodoService,
    private router: Router,
    private _snackbar: SnackbarService,
    readonly dialog: MatDialog
  ) {}

  onDelete(id: string) {
    const dialogRef = this.dialog.open(DialogBox, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response == 'true') {
        this.ls.deleteTask(id);
        this.ls.errorMessage$.subscribe((response) => {
          console.log(response);
          this.error = response;
          if (response) {
            this._snackbar.showError('Could not delete, try again');
          } else {
            this._snackbar.showInfo('Task deleted successfully!');
          }
        });
        console.info('Delete button is cliked', id);
      }
    });
  }
  onUpdate(id: string) {
    this.router.navigate(['/update-task', id]);
  }
}
