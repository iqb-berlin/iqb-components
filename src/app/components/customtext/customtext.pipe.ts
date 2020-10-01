import { Pipe, PipeTransform } from '@angular/core';
import { CustomtextService } from './customtext.service';

@Pipe({
  name: 'customtext'
})
export class CustomtextPipe implements PipeTransform {
  constructor(private cts: CustomtextService) {}

  transform(valueForChangeDetection: any, key: string, counter = 0): string {
    return this.cts.getCustomText(key, valueForChangeDetection);
  }
}
