import {
  by, element, ElementFinder
} from 'protractor';
import { ShowcasePage } from './showcase.po';
import { BrowserConsole } from './browser-console.po';

describe('Alert', () => {
  let containerCard: ElementFinder;
  let resultItem: ElementFinder;

  beforeEach(async () => {
    await ShowcasePage.navigateTo();
    containerCard = element(by.id('alert'));
    resultItem = containerCard.element(by.css('alert > div > div > span'));
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

  afterEach(BrowserConsole.assertNoLog);
});
