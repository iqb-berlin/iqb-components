import {TestBed} from '@angular/core/testing';
import {BugReportService} from './bug-report.service';
import {BugReport} from './bug-report.interfaces';

describe('BugReportService', () => {

    let bugReportService: BugReportService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                BugReportService,
                {
                    provide: "APP_VERSION",
                    useValue: '6.6.6'
                },
                {
                    provide: "APP_NAME",
                    useValue: 'serious app'
                }
            ]
        }).compileComponents();

        bugReportService = TestBed.get(BugReportService);
    });


    it('create BugReport with now as default time', () =>  {
        const bugReport: BugReport = bugReportService.applyDefaults({
            devInfo: "some error line"
        });

        expect(bugReport.date.getTime()/1000).toBeCloseTo(new Date().getTime()/1000, 2);
    });


    it('create BugReport with provided APP_VERSION and APP_NAME', () =>  {
        const bugReport: BugReport = bugReportService.applyDefaults({
            devInfo: "some error line"
        });

        expect(bugReport.version).toEqual("6.6.6");
        expect(bugReport.product).toEqual('serious app');
    });


    it('should create a BugReport from thrown error', () =>  {

        let bugReport: BugReport;

        try {

            // noinspection ExceptionCaughtLocallyJS
            throw new Error("intentionally thrown error");

        } catch (error) {

            bugReport = bugReportService.createFromJsError(error);
        }
        expect(bugReport).not.toBeNull();
        expect(bugReport.devInfo).not.toBeUndefined();
    });
});
