import { Injectable, Optional } from '@angular/core';
import { CustomTextDefs } from './customtext.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomtextService {
  public updateCount = 0;

  private customTexts: {[key: string]: string} = {};

  addCustomTexts(newTexts: {[key: string]: string}): void {
    Object.keys(newTexts).forEach((key) => {
      this.customTexts[key] = newTexts[key];
    });
    this.updateCount += 1;
  }

  addCustomTextsFromDefs(newTexts: CustomTextDefs): void {
    Object.keys(newTexts).forEach((key) => {
      this.customTexts[key] = newTexts[key].defaultvalue;
    });
    this.updateCount += 1;
  }

  getCustomText(key: string, @Optional() defaultReturn = ''): string {
    if (this.customTexts[key]) {
      return this.customTexts[key];
    }
    if (defaultReturn) {
      return defaultReturn;
    }
    return key;
  }
}
