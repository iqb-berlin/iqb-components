import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialogs/confirm/confirm-dialog.component';
import { MessageDialogComponent } from './dialogs/message/message-dialog.component';
import { BytesPipe } from './pipes/bytes.pipe';
import { CustomtextPipe } from './customtext/customtext.pipe';
import { CustomtextService } from './customtext/customtext.service';
import { ErrorHandler, IqbComponentsConfig, ServerError } from './iqb-components.classes';
import { CustomTextData, CustomTextDefs } from './customtext/customtext.interfaces';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {GitHubService} from './bug-report/targets/github.service';
import {BugReportService} from './bug-report/bug-report.service';
import { BugReportDialogComponent } from './bug-report/dialog/bug-report-dialog.component';

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
  ],
  exports: [
    ConfirmDialogComponent,
    MessageDialogComponent,
    BugReportDialogComponent,
    BytesPipe,
    CustomtextPipe,
  ],
  providers: [
    GitHubService,
    BugReportService
  ]
})
export class IqbComponentsModule {
  // if config is needed: static forRoot(config: IqbComponentsConfig): ModuleWithProviders {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IqbComponentsModule,
      providers: [
        {provide: IqbComponentsConfig}
      ]
    };
  }

  static forChild(): ModuleWithProviders {
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
  GitHubService
}; // IqbComponentsConfig
