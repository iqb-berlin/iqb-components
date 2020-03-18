import {browser, by, element, ElementFinder, ExpectedConditions as EC} from 'protractor';
import {protractor} from 'protractor/built/ptor';

export class ShowcasePage {

  static navigateTo(): Promise<void>  {

    return browser.get(browser.baseUrl) as Promise<any>;
  }

  static async getTitleText(): Promise<string> {

    return element(by.css('app-root h1')).getText();
  }

  static async typeIn(container: ElementFinder, nameOfInput: string, content: string): Promise<ElementFinder> {

    const elem = await container.element(by.css('[name="' + nameOfInput + '"]'));
    await elem.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a')); // protractor bug. await elem.clear(); does not work
    await elem.sendKeys(protractor.Key.BACK_SPACE); // see https://github.com/angular/protractor/issues/301
    await elem.sendKeys(content);
    return elem;
  }

  static async selectFromMatSelect(container: ElementFinder, value: string): Promise<void> {

    await container.element(by.css('mat-select .mat-select-arrow-wrapper')).click();
    await element(by.cssContainingText('mat-option .mat-option-text', value)).click();
    await browser.waitForAngular();
  }

  static async openDialog(container: ElementFinder): Promise<ElementFinder> {

    await container.element(by.css('button[class*="mat-raised-button"]')).click();
    const dialogContainer = await element(by.tagName('mat-dialog-container'));
    await browser.wait(EC.presenceOf(dialogContainer));
    return dialogContainer;
  }
}
