import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomtextService } from '../../components';

@Component({
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss']
})
export class LazyComponent {
  customTextValues = {
    ctv3: '',
    ctv4: ''
  };

  constructor(
    private router: Router,
    public cts: CustomtextService
  ) { }

  applyCustomTexts(): void {
    const myCustomTexts: { [key: string]: string } = {};
    myCustomTexts.ctv3 = this.customTextValues.ctv3;
    myCustomTexts.ctv4 = this.customTextValues.ctv4;
    this.cts.addCustomTexts(myCustomTexts);
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }
}
