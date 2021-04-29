import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LazyComponent } from './lazy.component';
import { IqbComponentsModule } from '../components';
import { LazyTestingRoutingModule } from './lazy-testing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    LazyTestingRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    IqbComponentsModule.forChild()
  ],
  declarations: [
    LazyComponent
  ],
  exports: [
    LazyComponent
  ]

})
export class LazyTestingModule {}
