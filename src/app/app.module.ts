import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { IqbComponentsModule } from './components';
import { LazyTestingModule } from './lazy-testing/lazy-testing.module';
import { ShowcaseService } from './showcase.service';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseModule } from './showcase.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IqbComponentsModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    FlexLayoutModule,
    ShowcaseRoutingModule,
    LazyTestingModule,
    ShowcaseModule
  ],
  providers: [
    ShowcaseService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
