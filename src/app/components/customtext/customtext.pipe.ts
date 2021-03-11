import { Pipe, PipeTransform } from '@angular/core';
import { CustomtextService } from './customtext.service';
import {Observable, of} from 'rxjs';
import {defaultIfEmpty, map, switchMap} from 'rxjs/operators';

@Pipe({
  name: 'customtext'
})
export class CustomtextPipe implements PipeTransform {
  constructor(private cts: CustomtextService) {}

  transform(defaultValue: string, key: string): Observable<string> {
    return of('...')
      .pipe(
        switchMap(() => this.cts.getCustomText(key)),
        defaultIfEmpty(defaultValue || key)
      );
  }
}
