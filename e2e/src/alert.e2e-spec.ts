import {
  browser, by, element, ElementFinder, logging
} from 'protractor';
import ShowcasePage from './showcase.po';

describe('Alert', () => {
  let containerCard: ElementFinder;
  let resultItem: ElementFinder;

  beforeEach(async () => {
    await ShowcasePage.navigateTo();
    containerCard = element(by.id('alert'));
    resultItem = containerCard.element(by.css('alert span'));
  });

  it('should use the the basic text as default for customtext-key if given', async () => {
    await ShowcasePage.typeIn(containerCard, 'text', 'this is `highlighted`');
    await expect(resultItem.getAttribute('innerHTML'))
      .toBe('this is <span class="highlight">highlighted</span>');
  });

  it('should show the basic text if customtext is not given', async () => {
    await ShowcasePage.typeIn(containerCard, 'text', 'this is `highlighted`');
    await ShowcasePage.typeIn(containerCard, 'customtext', '');
    await expect(resultItem.getAttribute('innerHTML'))
      .toBe('this is <span class="highlight">highlighted</span>');
  });

  it('should taket if customtext if given', async () => {
    await ShowcasePage.typeIn(containerCard, 'text', 'this is `highlighted`');

    await containerCard.element(by.css('[name="updateCustomText"]')).click();
    await expect(resultItem.getAttribute('innerHTML'))
      .toBe('My Custom-Text for Alert <span class="highlight">1</span>');

    await containerCard.element(by.css('[name="updateCustomText"]')).click();
    await expect(resultItem.getAttribute('innerHTML'))
      .toBe('My Custom-Text for Alert <span class="highlight">2</span>');

    await ShowcasePage.typeIn(containerCard, 'customtext', '');
    await expect(resultItem.getAttribute('innerHTML'))
      .toBe('this is <span class="highlight">highlighted</span>');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });
});
