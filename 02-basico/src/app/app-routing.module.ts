import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { UserGardService } from './guards/user-gard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [UserGardService] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
