import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'

const redirectLogin = () => redirectUnauthorizedTo(['login'])
const redirectHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectHome)
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectLogin)
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectHome)

  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
