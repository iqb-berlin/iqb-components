import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShowcaseService } from '../showcase.service';
import { CustomtextService } from '../../components';

@Component({
  templateUrl: './customtext.showcase.component.html',
  styleUrls: ['../showcase.component.scss'],
  selector: 'showcase-customtext'
})
export class CustomtextShowcaseComponent {
  constructor(
    private scs: ShowcaseService,
    private router: Router,
    private cts: CustomtextService
  ) {}

  customTextValues = {
    ctv1: '',
    ctv2: ''
  };

  customtextFetchedWithCode = '[Hit "Fetch customtext with code" to see anything here]';

  applyCustomTexts(): void {
    const myCustomTexts: { [key: string]: string } = {};
    myCustomTexts.ctv1 = this.customTextValues.ctv1;
    myCustomTexts.ctv2 = this.customTextValues.ctv2;
    this.cts.addCustomTexts(myCustomTexts);
  }

  goToLazy(): void {
    this.router.navigateByUrl('/lazy');
  }

  fetchCustomTextWithCode(): void {
    this.customtextFetchedWithCode = this.cts.getCustomText('ctv1');
  }
}
