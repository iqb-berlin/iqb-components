import { Component } from '@angular/core';
import { CustomtextService } from '../../components';

@Component({
  templateUrl: './alert-showcase.component.html',
  styleUrls: ['../showcase.component.scss'],
  selector: 'showcase-alert'
})
export class AlertShowcaseComponent {
  text: string = '`direct` inserted text';
  level: 'error' | 'warning' | 'info' | 'success' = 'info';
  customtext: string = 'alertText';
  private updateCustomTextCounter = 0;

  constructor(
    private cts: CustomtextService
  ) {}

  updateCustomText(): void {
    this.updateCustomTextCounter += 1;
    this.cts.addCustomTexts({
      alertText: `My Custom-Text for Alert \`${this.updateCustomTextCounter}\``
    });
  }
}
