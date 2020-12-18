import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { HopitauxComponent } from './components/hopitaux/hopitaux.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path:'',component:AccueilComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'profile',component:ProfileComponent,canActivate:[ProfileGuard]
  },
  {
    path:'inscription',component:InscriptionComponent
  },
  {
    path:'hopitaux',component:HopitauxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
