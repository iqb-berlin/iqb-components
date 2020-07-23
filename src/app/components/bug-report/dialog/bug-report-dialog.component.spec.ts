import { TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { BugReportDialogComponent } from './bug-report-dialog.component';
import {MatDialogClose, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BugReportResult, BugReportTargetService} from '../bug-report.interfaces';
import {Observable, of} from 'rxjs';
import {BugReportService} from '../bug-report.service';

describe('BugReportDialogComponent', () => {

  let fixture;
  let dialogComponent: BugReportDialogComponent;

  class MockBugReportTargetService implements BugReportTargetService {

    getTargetName(targetKey: string): string {
      return 'target of: ' + targetKey;
    }

    publishIssue(): Observable<BugReportResult> {

      return of({
        success: true,
        message: "ok"
      });
    }

    targets: {
      'a_key': { }
    };
  }

  class MockMatDialogRef {

    private dialogOutcome: string;

    afterClosed() {
      return of(this.dialogOutcome);
    }

    close(dialogOutcome: string) {
      this.dialogOutcome = dialogOutcome;
    }
  }

  class MockBugReportService {
    toText() {
      return 'bug report as text'
    }
    applyDefaults(any) {
      return any;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BugReportDialogComponent,
        MatDialogClose
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            report: {
              devInfo: "xxx",
              title: "title"
            },
            targetService: new MockBugReportTargetService(),
            targetKey: 'a_key',
            config: {
              hideFields: ['title']
            }
          }
        },
        {
          provide: MatDialogRef,
          useValue: new MockMatDialogRef()
        },
        {
          provide: MatDialog,
          useValue: 'browser'
        },
        {
          provide: BugReportService,
          useValue: new MockBugReportService()
        },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BugReportDialogComponent);
    dialogComponent = fixture.debugElement.componentInstance;
  });


  it('should create a component', async () => {

    expect(dialogComponent).toBeTruthy();
  });


  it('should extract provided data correctly', async () => {

    expect(dialogComponent.targetName).toEqual('target of: a_key');
    expect(dialogComponent.config).toEqual({
      hideFields: ['title']
    });
  });


  it('should be able to convert bugreport to text', async () => {

    expect(dialogComponent.getReportAsText()).toEqual('bug report as text');

  });


  it('submit on button click', async () => {

    dialogComponent.submitIssue();
    dialogComponent.dialogRef.afterClosed().subscribe(result => {
      expect(result).toEqual({
        success: true,
        message: "ok"
      });
    });
  });
});
