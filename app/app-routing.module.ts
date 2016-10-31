import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { WalletTableComponent } from './components/table/wtable.component';
import {AboutComponent} from "./components/about/about.component";


const routes: Routes = [
  { path:'', component:WalletTableComponent },
  { path:'about', component:AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routedComponents = [WalletTableComponent];

