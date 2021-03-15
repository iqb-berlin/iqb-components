import { Pipe, PipeTransform } from '@angular/core';
import { CustomtextService } from './customtext.service';

@Pipe({
  name: 'customtext'
})
export class CustomtextPipe implements PipeTransform {
  constructor(private cts: CustomtextService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(valueForChangeDetection: string, key: string, counter = 0, ...replacements: string[]): string {
    let customText = this.cts.getCustomText(key, valueForChangeDetection);
    replacements
      .forEach(replacement => {
        customText = customText.replace('%s', replacement);
      });
    return customText;
  }
}
