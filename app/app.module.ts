import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {Ng2Webstorage} from 'ng2-webstorage';
import { AppComponent }  from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WalletTableComponent } from './components/table/wtable.component';
import {EtherscanService} from "./components/services/etherscan.service";
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, NgbModule.forRoot() ,Ng2Webstorage],
  declarations: [ AppComponent, WalletTableComponent],
  providers: [EtherscanService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
