import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/authservices/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/public/register/register.module#RegisterPageModule' },
  {
    path: 'private',
    canActivate: [AuthGuardService],
    loadChildren: './pages/private/private-routing.module#PrivateRoutingModule'
  },
  // TODO: Create an awesome 404 Page :D
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
