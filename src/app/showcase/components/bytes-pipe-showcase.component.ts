import { Component } from '@angular/core';

@Component({
  templateUrl: './bytes-pipe-showcase.component.html',
  styleUrls: ['../showcase.component.scss'],
  selector: 'showcase-bytes-pipe'
})
export class BytesPipeShowcaseComponent {
  pipeBytesValue = '1, 100, 10000, 100000, 1000000, 10000000, 100000000, 10000000000000000';

  applyPipeBytes(): number[] {
    return this.pipeBytesValue
      .split(',')
      .map(item => parseInt(item, 10));
  }
}
