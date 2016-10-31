import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }  from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';

//imported moduls
import {Ng2Webstorage} from 'ng2-webstorage';

//components
import { NavbarComponent } from './components/navbar/navbar.component';
import { WalletTableComponent } from './components/table/wtable.component';
import { AboutComponent} from './components/about/about.component';

//services
import {EtherscanService} from "./components/services/etherscan.service";



@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, NgbModule.forRoot() ,Ng2Webstorage, AppRoutingModule],
  declarations: [ AppComponent, NavbarComponent, WalletTableComponent, AboutComponent, routedComponents],
  providers: [EtherscanService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}


