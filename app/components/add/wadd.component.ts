import { Component } from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {Wallet} from '../wallet.model';

var stringify = require('json-stringify-safe');


@Component({
  moduleId: module.id,
  selector: 'wadd',
  templateUrl: 'wadd.component.html'
})
export class WalletAddComponent {

  wallet:Wallet;
  key:string;

  constructor(private storage:LocalStorageService) {}

  saveValue() {
    var portfolio:Wallet[] = JSON.parse(this.storage.retrieve('portfolio'));

    if(portfolio == null){
      portfolio = [];
    }
    this.wallet = new Wallet();
    this.wallet.name = 'Wallet';
    this.wallet.publicKey = this.key;
    this.wallet.balance = 120;
    this.wallet.value = 0;

    console.log("New Wallet added: "+this.wallet.publicKey);
    portfolio.push(this.wallet);

    var json = stringify(portfolio, null, 2);
    this.storage.store('portfolio', json);
    this.wallet = new Wallet();
    console.log(portfolio + " saved into local storage");
  }

  clearStorage(){
    this.storage.clear();
    console.log("Storage cleared");
    console.log(this.storage.retrieve('portfolio'));
  }
}
