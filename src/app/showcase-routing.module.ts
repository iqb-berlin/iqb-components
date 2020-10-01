import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Showcase } from './showcase.component';

const routes: Routes = [
  { path: '', component: Showcase, pathMatch: 'full' },
  { path: 'start', component: Showcase },
  { path: 'lazy', loadChildren: './lazy-testing/lazy-testing.module#LazyTestingModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ShowcaseRoutingModule { }
