import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components';

@Component({
  templateUrl: './confirm-dialog-showcase.component.html',
  styleUrls: ['../showcase.component.scss'],
  selector: 'showcase-confirm-dialog'
})
export class ConfirmDialogShowcaseComponent {
  confirmDialogData = {
    title: 'Please confirm',
    content: 'this action must be confirmed',
    confirmbuttonlabel: 'Yes, do it!',
    showcancel: true
  };

  confirmDialogResult: any;

  constructor(
    public dialog: MatDialog
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      data: { ...this.confirmDialogData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with:', result);
      this.confirmDialogResult = result;
    });
  }
}
