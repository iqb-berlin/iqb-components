import { browser, logging } from 'protractor';

export class BrowserConsole {
  static assertNoLog = async (): Promise<void> => {
    // Assert that there are no errors emitted from the browser
    const logs = await BrowserConsole.getLog();
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  };

  static getLog = async (): Promise<logging.Entry[]> => browser.manage().logs().get(logging.Type.BROWSER);
}
