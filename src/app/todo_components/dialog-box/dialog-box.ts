import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.scss',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
  ],
})
export class DialogBox {
  // readonly dialog = inject(MatDialogRef);
  constructor(private _dialog: MatDialogRef<DialogBox>) {}
  @Output() YesOrNo = new EventEmitter<string>();
  onClick(val: string) {
    this._dialog.close(val);
    console.log(val);
    // this.YesOrNo.emit(val);
  }
}
