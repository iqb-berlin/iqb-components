import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IqbComponentsModule } from './components';
import { LazyTestingModule } from './showcase/lazy-testing/lazy-testing.module';
import { ShowcaseService } from './showcase/showcase.service';
import { ShowcaseRoutingModule } from './showcase/showcase-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseModule } from './showcase/showcase.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IqbComponentsModule.forRoot(),
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
