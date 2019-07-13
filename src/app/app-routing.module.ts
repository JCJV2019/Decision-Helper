import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { HomeComponent } from './commons/home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberComponent } from './members/member/member.component';
import { MemberAddComponent } from './members/member-add/member-add.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'member/:id', component: MemberComponent },
  { path: 'newMember', component: MemberAddComponent },
  { path: 'member-list', component: MemberListComponent },
  { path: 'editMember/:id', component: MemberEditComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
