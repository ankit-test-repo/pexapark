import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllFarmsComponent} from './pages/all-farms/all-farms.component';
import {FarmOutputComponent} from './pages/farm-output/farm-output.component';

const routes: Routes = [
  {path: 'farms', component: AllFarmsComponent},
  {path: 'farms/:id', component: FarmOutputComponent},
  {path: '', redirectTo: '/farms', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
