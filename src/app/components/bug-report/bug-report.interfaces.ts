import {Observable} from 'rxjs';

export interface BugReport {
    title?: string;
    comment?: string;

    devInfo?: string;           // stack trace, console.output or internal error information
    errorId?: string;           // an error identifier. Can be a unique ID or an internal Error-Class or whatever
    reporterName?: string;
    reporterEmail?: string;

    date?: Date;
    url?: string,
    userAgent?: string;         // userAgent string

    product?: string;           // name of your app
    version?: string;           // version of your app
}

export interface BugReportDialogConfig {
    hideFields: ['title' | 'reporterEmail' | 'reporterName' | 'comment'],
    commentTemplate?: string
}

export interface BugReportDialogData {
    report: BugReport,
    targetService: BugReportTargetService,
    targetKey: string,
    config: BugReportDialogConfig
}

export interface BugReportTargetService {
    getTargetName: (targetKey: string) => string,
    publishIssue: (bugReport: BugReport, targetKey: string) => Observable<BugReportResult>,
    targets: {[key: string]: BugReportTarget};
}

export interface BugReportTarget {
    [key: string]: any,
    toString: () => string
}

export interface BugReportResult {
    uri?: string,
    message: string,
    success: boolean,
}
