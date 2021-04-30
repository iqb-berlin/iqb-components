import {
  by, element
} from 'protractor';
import { ShowcasePage } from './showcase.po';
import { BrowserConsole } from './browser-console.po';

describe('Bytes Pipe', () => {
  it('should calculate human readable bytes successfully', async () => {
    await ShowcasePage.navigateTo();

    const containerCard = element(by.id('bytesPipe'));

    await ShowcasePage.typeIn(containerCard, 'pipetestvalues', '5, 1024, 1536, 11000000000000');

    const resultItems = await containerCard.all(by.css('.result ul li'));
    await expect(resultItems[0].getText()).toBe('5.0 B');
    await expect(resultItems[1].getText()).toBe('1.0 KB');
    await expect(resultItems[2].getText()).toBe('1.5 KB');
    await expect(resultItems[3].getText()).toBe('10.0 TB');
  });

  afterEach(BrowserConsole.assertNoLog);
});
