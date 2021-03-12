import { CustomtextPipe } from './customtext.pipe';
import { CustomtextService } from './customtext.service';

describe('CustomtextPipe', () => {
  fit('transforms texts correctly', () => {
    const cts = new CustomtextService();
    cts.addCustomTexts({
      key1: 'value-1',
      key2: 'value-2'
    });
    const pipe = new CustomtextPipe(cts);
    pipe.transform('default value', 'key1')
      .subscribe(displayedText => expect(displayedText).toEqual('value-1'));
    pipe.transform('', 'key2')
      .subscribe(displayedText => expect(displayedText).toEqual('value-2'));
    pipe.transform('default value', 'unregistered_key')
      .subscribe(displayedText => expect(displayedText).toEqual('default value'));
    pipe.transform('', 'unregistered_key')
      .subscribe(displayedText => expect(displayedText).toEqual('unregistered_key'));
  });
});
