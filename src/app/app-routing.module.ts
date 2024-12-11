import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  { path: 'Home', component: HomeComponent },
  {
    path: 'Pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
