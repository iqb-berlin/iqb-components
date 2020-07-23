import {Inject, Injectable} from '@angular/core';
import {BugReport} from './bug-report.interfaces';

@Injectable()
export class BugReportService {

    constructor(
        @Inject('APP_NAME') private appName: string,
        @Inject('APP_VERSION') private appVersion: string
    ) {

    }

    applyDefaults(initData: BugReport): BugReport {
        return {
            devInfo: initData.devInfo || Error().stack,

            title: initData.title || '',
            comment: initData.comment || '',

            errorId: initData.errorId || '',

            reporterName: initData.reporterName || 'anonymous',
            reporterEmail: initData.reporterEmail || '',

            date: initData.date || new Date(),
            url: initData.url || window.location.href,
            userAgent: initData.url || window.navigator.userAgent,

            version: initData.version || this.appVersion || '0.0.0',
            product: initData.product || this.appName || 'app',
        }
    }

    createFromJsError(error: Error): BugReport {

        return this.applyDefaults({
            title: error.name + ": " + error.message,
            devInfo: error.stack.toString()
        });
    }

    toText(report: BugReport): string {

        return `# ${report.title}\n`
            + `Product: \`${report.product}\`\n`
            + `Version : \`${report.version}\`\n`
            + `URL: \`${report.url}\` \n`
            + `Date: \`${report.date.toLocaleDateString()} ${report.date.toLocaleTimeString()}\`\n`
            + `UserAgent \`${report.userAgent}\`\n`
            + `\nReported by: \`${report.reporterName}<${report.reporterEmail}>\n`
            + (report.errorId ? `error-id: \`${report.errorId}\`\n` : '')
            + `\n# Description\n${report.comment}\n`
            + `\n# Error source code:\n\`\`\`\n${report.devInfo}\n\`\`\`\n`;
    }
}
