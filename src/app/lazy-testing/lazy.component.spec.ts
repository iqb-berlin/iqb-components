import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyComponent } from './lazy.component';
import { IqbComponentsModule } from '../components/iqb-components.module';
import { FormsModule } from '@angular/forms';
import { ObserversModule } from '@angular/cdk/observers';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatRippleModule} from "@angular/material/core";

describe('LazyComponent', () => {
  let component: LazyComponent;
  let fixture: ComponentFixture<LazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ObserversModule,
        RouterTestingModule.withRoutes([]),
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatRippleModule,
        IqbComponentsModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        LazyComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<LazyComponent>(LazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
