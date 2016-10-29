import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {Ng2Webstorage} from 'ng2-webstorage';
import { AppComponent }  from './app.component';
import { WalletTableComponent } from './components/table/wtable.component';
import { WalletAddComponent } from './components/add/wadd.component';
import {EtherscanService} from "./components/services/etherscan.service";
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, Ng2Webstorage],
  declarations: [ AppComponent, WalletTableComponent, WalletAddComponent],
  providers: [EtherscanService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
