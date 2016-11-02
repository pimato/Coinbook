import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { WalletTableComponent } from './components/table/wtable.component';
import {SettingsComponent} from "./components/about/settings.component";


const routes: Routes = [
  { path:'portfolio', component:WalletTableComponent },
  { path:'settings', component:SettingsComponent},
  { path:'', redirectTo: '/portfolio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routedComponents = [WalletTableComponent];

