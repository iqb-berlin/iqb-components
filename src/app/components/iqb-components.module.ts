import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConfirmDialogComponent, ConfirmDialogData } from './dialogs/confirm/confirm-dialog.component';
import { MessageDialogComponent, MessageDialogData, MessageType } from './dialogs/message/message-dialog.component';
import { BytesPipe } from './pipes/bytes.pipe';
import { CustomtextPipe } from './customtext/customtext.pipe';
import { CustomtextService } from './customtext/customtext.service';
import { ErrorHandler, IqbComponentsConfig, ServerError } from './iqb-components.classes';
import { CustomTextData, CustomTextDefs } from './customtext/customtext.interfaces';
import { GitHubService } from './bug-report/targets/github.service';
import { BugReportService } from './bug-report/bug-report.service';
import { BugReportDialogComponent } from './bug-report/dialog/bug-report-dialog.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    MessageDialogComponent,
    BugReportDialogComponent
  ],
  declarations: [
    ConfirmDialogComponent,
    MessageDialogComponent,
    BugReportDialogComponent,
    BytesPipe,
    CustomtextPipe,
    AlertComponent
  ],
  exports: [
    ConfirmDialogComponent,
    MessageDialogComponent,
    BugReportDialogComponent,
    BytesPipe,
    CustomtextPipe,
    AlertComponent
  ],
  providers: [
    GitHubService,
    BugReportService
  ]
})
export class IqbComponentsModule {
  // if config is needed: static forRoot(config: IqbComponentsConfig): ModuleWithProviders {
  static forRoot(): ModuleWithProviders<IqbComponentsModule> {
    return {
      ngModule: IqbComponentsModule,
      providers: [
        { provide: IqbComponentsConfig }
      ]
    };
  }

  static forChild(): ModuleWithProviders<IqbComponentsModule> {
    return {
      ngModule: IqbComponentsModule
    };
  }
}

export {
  ConfirmDialogComponent,
  MessageDialogComponent,
  BugReportDialogComponent,
  ServerError,
  ErrorHandler,
  CustomTextData,
  CustomTextDefs,
  BytesPipe,
  CustomtextPipe,
  CustomtextService,
  BugReportService,
  GitHubService,
  MessageDialogData,
  MessageType,
  ConfirmDialogData,
  AlertComponent
}; // IqbComponentsConfig
