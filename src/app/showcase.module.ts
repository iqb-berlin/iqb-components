import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexModule } from '@angular/flex-layout';
import { AlertShowcaseComponent } from './showcase/alertShowcase.component';
import { IqbComponentsModule } from './components';
import { ShowcaseComponent } from './showcase.component';

@NgModule({
  declarations: [
    ShowcaseComponent,
    AlertShowcaseComponent
  ],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    IqbComponentsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
    FlexModule
  ]
})
export class ShowcaseModule { }
