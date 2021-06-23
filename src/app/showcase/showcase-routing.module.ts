import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowcaseComponent } from './showcase.component';

const routes: Routes = [
  { path: '', component: ShowcaseComponent, pathMatch: 'full' },
  { path: 'start', component: ShowcaseComponent },
  { path: 'lazy', loadChildren: () => import('./lazy-testing/lazy-testing.module').then(m => m.LazyTestingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class ShowcaseRoutingModule { }
