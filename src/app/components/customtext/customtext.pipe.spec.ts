import { CustomtextPipe } from './customtext.pipe';
import { CustomtextService } from './customtext.service';

describe('CustomtextPipe', () => {
  it('creates an instance of CustomtextService, transform via pipe, get valid texts', () => {
    const cts = new CustomtextService();
    cts.addCustomTexts({
      ctv1: 'Sosososo',
      ctv2: 'Düdüdüdü',
      ctv3: 'yoyoyoyo'
    });
    const pipe = new CustomtextPipe(cts);
    expect(pipe.transform('any', 'ctv1')).toBe('Sosososo');
    expect(pipe.transform('any', 'ctv2')).toBe('Düdüdüdü');
    expect(pipe.transform('any', 'ctv3')).toBe('yoyoyoyo');
    expect(pipe.transform('any', 'ctv4')).toBe('any');
  });

  it('uses replacement parameters correctly', () => {
    const cts = new CustomtextService();
    cts.addCustomTexts({
      oneToken: 'Replace this: %s',
      twoTokens: 'Replace two things: %s, %s',
      noToken: 'Replace nothing'
    });
    const pipe = new CustomtextPipe(cts);
    expect(pipe.transform('any', 'oneToken', 0, '1st')).toBe('Replace this: 1st');
    expect(pipe.transform('any', 'oneToken', 0)).toBe('Replace this: %s');
    expect(pipe.transform('any', 'oneToken', 0, '1st', '2nd')).toBe('Replace this: 1st');
    expect(pipe.transform('any', 'twoTokens', 0, '1st')).toBe('Replace two things: 1st, %s');
    expect(pipe.transform('any', 'twoTokens', 0)).toBe('Replace two things: %s, %s');
    expect(pipe.transform('any', 'twoTokens', 0, '1st', '2nd')).toBe('Replace two things: 1st, 2nd');
    expect(pipe.transform('any', 'noToken', 0, '1st')).toBe('Replace nothing');

    cts.addCustomTexts({
      oneToken: 'Replace this after update: %s'
    });
    expect(pipe.transform('any', 'oneToken', 1, '1st')).toBe('Replace this after update: 1st');
  });
});
