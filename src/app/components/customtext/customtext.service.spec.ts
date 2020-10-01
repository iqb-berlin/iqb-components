import { TestBed } from '@angular/core/testing';

import { CustomtextService } from './customtext.service';

describe('CustomtextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('load and deliver correct text by key', () => {
    const service: CustomtextService = TestBed.get(CustomtextService);
    expect(service.updateCount).toBe(0);
    service.addCustomTexts({
      ctv1: 'Sosososo',
      ctv2: 'Düdüdüdü',
      ctv3: 'yoyoyoyo'
    });
    expect(service.updateCount).toBe(1);
    expect(service.getCustomText('ctv1', 'default_ctv1')).toBe('Sosososo');
    expect(service.getCustomText('ctv2', 'default_ctv2')).toBe('Düdüdüdü');
    expect(service.getCustomText('ctv3', 'default_ctv3')).toBe('yoyoyoyo');
    expect(service.getCustomText('ctv11', 'default_ctv11')).toBe('default_ctv11');
    expect(service.getCustomText('ctv11')).toBe('ctv11');
    service.addCustomTexts({
      ctv2: 'jajajajaja',
      ctv11: 'meijomei'
    });
    expect(service.updateCount).toBe(2);
    expect(service.getCustomText('ctv1', 'default_ctv1')).toBe('Sosososo');
    expect(service.getCustomText('ctv2', 'default_ctv2')).toBe('jajajajaja');
    expect(service.getCustomText('ctv3', 'default_ctv3')).toBe('yoyoyoyo');
    expect(service.getCustomText('ctv11', 'default_ctv11')).toBe('meijomei');
    service.addCustomTexts({
      ctv11: ''
    });
    expect(service.updateCount).toBe(3);
    expect(service.getCustomText('ctv11')).toBe('ctv11');
    expect(service.getCustomText('ctv11', 'default_ctv11')).toBe('default_ctv11');
  });
});
