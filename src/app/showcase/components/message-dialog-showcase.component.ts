import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../components';

@Component({
  templateUrl: './message-dialog-showcase.component.html',
  styleUrls: ['../showcase.component.scss'],
  selector: 'showcase-message-dialog'
})
export class MessageDialogShowcaseComponent {
  messageDialogData = {
    type: 2,
    title: 'Message',
    content: 'This is some nice Dialogue',
    closebuttonlabel: 'Screw it'
  };

  messageDialogResult: any;

  constructor(
    public dialog: MatDialog
  ) { }

  openMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: 'auto',
      data: { ...this.messageDialogData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with:', result);
      this.messageDialogResult = result;
    });
  }
}
