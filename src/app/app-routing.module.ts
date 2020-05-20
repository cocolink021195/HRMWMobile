import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
