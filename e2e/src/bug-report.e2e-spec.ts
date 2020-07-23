import { ShowcasePage } from './showcase.po';
import {browser, by, element, logging, ExpectedConditions as EC} from 'protractor';


describe('Bug Report', () => {
    let page: ShowcasePage;

    beforeEach(() => {
        page = new ShowcasePage();
    });

    const containerCard = element(by.id('bugReportDialog'));

    it('dialog should pop up and set values and config according to setup.', async () => {
        await ShowcasePage.navigateTo();

        await ShowcasePage.typeIn(containerCard, 'title', 'abc');
        await ShowcasePage.typeIn(containerCard, 'devInfo', '');
        await ShowcasePage.typeIn(containerCard, 'reporterName', 'ghi');
        await ShowcasePage.typeIn(containerCard, 'reporterEmail', 'jkl');
        await element(by.name('hideTitle')).click();
        await element(by.name('hideReporterEmail')).click();
        await ShowcasePage.typeIn(containerCard, 'commentTemplate', 'mno');

        let dialogContainer = await ShowcasePage.openDialog(containerCard);

        await expect(dialogContainer.element(by.name('title')).isPresent()).toBeTruthy()
        await expect(dialogContainer.element(by.name('comment')).isPresent()).toBeTruthy();
        await expect(dialogContainer.element(by.name('reporterName')).isPresent()).toBeTruthy();
        await expect(dialogContainer.element(by.name('reporterEmail')).isPresent()).toBeFalsy();
        await expect(dialogContainer.element(by.name('title')).getAttribute("value")).toEqual("abc");
        await expect(dialogContainer.element(by.name('reporterName')).getAttribute("value")).toEqual("ghi");
        await expect(dialogContainer.element(by.name('comment')).getAttribute("value")).toEqual("mno");

        await dialogContainer.element(by.tagName('mat-expansion-panel')).click();

        await dialogContainer.all(by.tagName('button')).last().click();
        await browser.wait(EC.stalenessOf(dialogContainer));
    });


    it('dialog should return error, if it can not send BugReport to target.', async () => {
        await ShowcasePage.navigateTo();

        await ShowcasePage.selectFromMatSelect(element(by.id("bugReportTargetKey")), 'dummy')
        const dialogContainer = await ShowcasePage.openDialog(containerCard);

        await dialogContainer.element(by.id('report-bug-send')).click();

        await browser.wait(EC.stalenessOf(dialogContainer));

        await expect(containerCard.element(by.css('.result')).getText())
            .toEqual('Result: Error when reporting issue to GitHub (iqb-berlin/non-existing-repo).');

        // at this point we resign from testing the success case since http mockModule for angular is not supported
        // https://github.com/angular/protractor/blob/88a1b3a30386771bcb84eb6b79d19fa256589f2c/lib/browser.ts#L971-L972
        // and setting up a complete mock-backend for this single call would be way too much overhead for a single call
    });

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        // 2 errors are expected because it can't find the dummy github repo
        // and subsequently can't make the call
        expect(logs.length).not.toBeGreaterThan(2);
    });
});
