import { Injectable, Optional } from '@angular/core';
import { CustomTextDefs } from './customtext.interfaces';
import {BehaviorSubject, Observable, of, Subject, Subscribable} from 'rxjs';
import {defaultIfEmpty, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomtextService {

  private customTexts: {[key: string]: Subject<string>} = {};

  addCustomTexts(newTexts: {[key: string]: string}): void {
    Object.keys(newTexts).forEach((key) => {
      this.addCustomText(key, newTexts[key]);
    });
  }

  addCustomTextsFromDefs(newTexts: CustomTextDefs): void {
    Object.keys(newTexts).forEach((key) => {
      this.addCustomText(key, newTexts[key].defaultvalue);
    });
  }

  private addCustomText(key: string, value: string): void {
    if (typeof this.customTexts[key] === "undefined") {
      this.customTexts[key] = new Subject<string>();
    }
    this.customTexts[key].next(value);
  }

  // this function gets called the first time wehen Observable is not available, so we just return a Subscribable
  getCustomText(key: string): Subscribable<string> {
    if (typeof this.customTexts[key] === "undefined") {
      this.customTexts[key] = new Subject<string>();
    }
    return this.customTexts[key];
  }
}
