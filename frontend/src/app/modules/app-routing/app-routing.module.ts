import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { authGuard } from 'src/app/security/guards/auth.guard';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';


const routes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
