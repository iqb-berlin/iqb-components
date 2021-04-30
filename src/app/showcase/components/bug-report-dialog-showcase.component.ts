import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BugReport } from '../../components/bug-report/bug-report.interfaces';
import { BugReportDialogComponent, BugReportService, GitHubService } from '../../components';

@Component({
  templateUrl: './bug-report-dialog-showcase.component.html',
  styleUrls: ['../showcase.component.scss'],
  selector: 'showcase-bug-report-dialog'
})
export class BugReportDialogShowcaseComponent {
  bugReportDialogReport: BugReport = {
    title: 'error-title',
    errorId: '#1337',
    reporterName: 'paf',
    devInfo: 'error in line 135'
  };

  bugReportDialogConfigHideFields = {
    title: true,
    comment: false,
    reporterName: false,
    reporterEmail: false
  };

  bugReportDialogCommentTemplate = '## What have you done?\n\n' +
    '## What should have happened?\n\n' +
    '## Was happened instead?';

  bugReportTargetKey = 'default';

  bugReportDialogResult: any;

  constructor(
    public dialog: MatDialog,
    public gitHubService: GitHubService,
    private bugReportService: BugReportService
  ) {
  }

  openBugReportDialog(): void {
    const config = {
      hideFields: [],
      commentTemplate: this.bugReportDialogCommentTemplate
    };
    Object.keys(this.bugReportDialogConfigHideFields).forEach((key: string) => {
      if (this.bugReportDialogConfigHideFields[key]) config.hideFields.push(key);
    });

    const dialogRef = this.dialog.open(BugReportDialogComponent, {
      data: {
        report: this.bugReportDialogReport,
        targetService: this.gitHubService,
        targetKey: this.bugReportTargetKey,
        config
      }
    });

    dialogRef.afterClosed().subscribe(bugReportResult => {
      this.bugReportDialogResult = bugReportResult ? bugReportResult.message : 'aborted';
    });
  }

  convertJSErrorToBugReportDialogData(): void {
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('intentionally thrown error');
    } catch (error) {
      this.bugReportDialogReport = this.bugReportService.createFromJsError(error);
    }
  }
}
