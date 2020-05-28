import { AuthGuard } from './helpers/auth.guard';
import { ListComponent } from './main/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { UserProfileComponent } from './main/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'fbs',
    loadChildren: () => import('./modules/feedback-system/feedback-system.module').then(m => m.FeedbackSystemModule),
    canLoad: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
