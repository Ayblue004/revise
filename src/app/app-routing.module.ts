import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleComponent } from './module/module.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { CardsComponent } from './cards/cards.component';
import { AdminComponent } from './admin/admin.component';
import { ContributeComponent } from './contribute/contribute.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'modules', component:ModuleComponent},
  {path:'portal/:class', component:PortalComponent},
  {path: 'cards/:module/:type', component:CardsComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'contribute', component:ContributeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }