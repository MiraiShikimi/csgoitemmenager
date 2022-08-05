import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserItemsComponent } from './user-items/user-items.component';

const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  {path: 'login', component: LoginComponent},
  {path: 'items', component: UserItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
