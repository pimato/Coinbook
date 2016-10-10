import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }  from './app.component';

import {Ng2Webstorage} from 'ng2-webstorage';


//custom components
import { WalletTableComponent } from './components/wtable.component';
import { WalletAddComponent } from './components/wadd.component';


@NgModule({
  imports: [ BrowserModule, FormsModule, Ng2Webstorage ],
  declarations: [ AppComponent, WalletTableComponent, WalletAddComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
