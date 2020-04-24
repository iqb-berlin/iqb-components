import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {BugReportResult, BugReportTarget, BugReportTargetService} from './bug-report.interfaces';
import {BugReport} from './bug-report.class';

export interface GitHubData {
    repositoryUrls: {[key: string]: string},
    user: string,
    token: string
}

export class GitHubRepository implements BugReportTarget {
    owner: string;
    name: string;
}

@Injectable()
export class GitHubService implements BugReportTargetService {

    private readonly user: string;
    private readonly token: string;
    public readonly targets: {[key: string]: GitHubRepository} = {};

    constructor(
        @Inject('GITHUB_DATA') gitHubData: GitHubData,
        private http: HttpClient
    ) {

        this.user = gitHubData.user;
        this.token = gitHubData.token;

        console.log(gitHubData, this.targets);

        Object.keys(gitHubData.repositoryUrls).forEach((key: string) => {

            const repositoryUrl = gitHubData.repositoryUrls[key];
            const match = /github\.com\/([\w-]+)\/([\w-]+)/gm.exec(repositoryUrl);
            console.log(match);

            if (match.length) {
                this.targets[key] = ({
                    owner: match[1],
                    name: match[2]
                });
            }
        });

        console.log(gitHubData, this.targets);
    }


    publishIssue(bugReport: BugReport, targetKey: string = 'default'): Observable<BugReportResult> {

        const repository = this.targets[targetKey];
        if (typeof repository === "undefined") {
            console.error(`No repository '${targetKey}' defined.`);
            return of(null);
        }

        const url = `https://api.github.com/repos/${repository.owner}/${repository.name}/issues`;

        const body = {
            title: bugReport.title,
            body: bugReport.toText(),
            labels: ['BugReport']
        }

        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.user + ':' + this.token)
        });

        const errorText = `Error when reporting issue to GitHub (${repository.owner}/${repository.name}).`;

        return this.http.post(url, body, {headers})
            .pipe(catchError((error: HttpErrorResponse): Observable<BugReportResult> => {
                console.error(errorText, error);
                return of({
                    message: errorText,
                    success: false,
                });
            }))
            .pipe(map((data:object): BugReportResult => {
                if (!data) {
                    console.error(errorText, 'no data!');
                    return {
                        message: errorText,
                        success: false
                    }
                }
                return {
                    uri: data['url'],
                    message: `Bug reported to GitHub: ${data['url']}`,
                    success: true
                };
            }));
    }

    getTargetName(targetKey: string = 'default'): string {

        const repository = this.targets[targetKey];
        if (typeof repository === "undefined") {
            return "http://github.com";
        }
        return `http://github.com/${repository.owner}/${repository.name}/issues`;
    }

}
