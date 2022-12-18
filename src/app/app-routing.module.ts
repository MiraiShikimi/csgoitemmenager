import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { ItemscontrollComponent } from './itemscontroll/itemscontroll.component';
import { UserItemsComponent } from './user-items/user-items.component';

const routes: Routes = [
  {path: 'sign-up', component: SignupComponent },
  {path: 'login', component: LoginComponent},
  {path: 'items', component: ItemscontrollComponent},
  {path: '', component: HomescreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
