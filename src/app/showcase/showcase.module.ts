import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AlertShowcaseComponent } from './components/alert-showcase.component';
import { IqbComponentsModule } from '../components';
import { ShowcaseComponent } from './showcase.component';
import { ConfirmDialogShowcaseComponent } from './components/confirm-dialog-showcase.component';
import { MessageDialogShowcaseComponent } from './components/message-dialog-showcase.component';
import { BugReportDialogShowcaseComponent } from './components/bug-report-dialog-showcase.component';
import { BytesPipeShowcaseComponent } from './components/bytes-pipe-showcase.component';
import { ServerErrorShowcaseComponent } from './components/server-error-showcase.component';
import { CustomtextShowcaseComponent } from './components/customtext.showcase.component';

@NgModule({
  declarations: [
    ShowcaseComponent,
    AlertShowcaseComponent,
    ConfirmDialogShowcaseComponent,
    MessageDialogShowcaseComponent,
    BugReportDialogShowcaseComponent,
    CustomtextShowcaseComponent,
    ServerErrorShowcaseComponent,
    BytesPipeShowcaseComponent,
    BytesPipeShowcaseComponent,
    ServerErrorShowcaseComponent,
    CustomtextShowcaseComponent
  ],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    IqbComponentsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
    FlexModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class ShowcaseModule { }
