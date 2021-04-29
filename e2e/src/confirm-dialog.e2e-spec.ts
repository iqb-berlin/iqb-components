import {
  browser, by, element, logging, ExpectedConditions as EC
} from 'protractor';
import ShowcasePage from './showcase.po';

describe('Confirm Dialog', () => {
  it('should pop up and set buttons and labels according to setup.', async () => {
    await ShowcasePage.navigateTo();

    const containerCard = element(by.id('confirmDialog'));

    await ShowcasePage.typeIn(containerCard, 'title', 'abc');
    await ShowcasePage.typeIn(containerCard, 'content', 'def');
    await ShowcasePage.typeIn(containerCard, 'confirmbuttonlabel', 'ghi');

    let dialogContainer = await ShowcasePage.openDialog(containerCard);

    await expect(dialogContainer.element(by.tagName('h1')).getText()).toBe('abc');
    await expect(dialogContainer.element(by.tagName('p')).getText()).toBe('def');
    await expect(dialogContainer.element(by.css('button.mat-primary')).getText()).toBe('ghi');
    await expect(dialogContainer.all(by.tagName('button')).count()).toEqual(2);

    await dialogContainer.all(by.tagName('button')).last().click();
    await browser.wait(EC.stalenessOf(dialogContainer));

    await expect(containerCard.element(by.css('.result')).getText()).toBe('false');

    await containerCard.element(by.tagName('mat-checkbox')).click();
    await ShowcasePage.typeIn(containerCard, 'title', '');

    dialogContainer = await ShowcasePage.openDialog(containerCard);
    await browser.wait(EC.presenceOf(dialogContainer));

    await expect(dialogContainer.all(by.tagName('button')).count()).toEqual(1);
    await expect(dialogContainer.element(by.tagName('h1')).getText()).toBe('Bitte bestätigen!');

    await dialogContainer.all(by.tagName('button')).first().click();
    await browser.wait(EC.stalenessOf(dialogContainer));

    await expect(containerCard.element(by.css('.result')).getText()).toBe('true');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });
});
