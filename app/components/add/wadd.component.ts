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

  key:string;

  constructor(private storage:LocalStorageService) {}

  saveValue() {

    //get wallets from chrome storage
    var portfolio:Wallet[] = JSON.parse(this.storage.retrieve('portfolio'));

    //check if the chrome storage does not have any wallets
    if(portfolio == null){
      portfolio = [];
    }
    //push the new wallet into the storage
    portfolio.push(new Wallet({name: 'Wallet', publicKey: this.key, balance: 120, value: 0}));

    //change the database to a readable json object
    var database = stringify(portfolio, null, 2);

    this.storage.store('portfolio', database);
  }

  clearStorage(){
    this.storage.clear();
    console.log("Storage cleared");
    console.log(this.storage.retrieve('portfolio'));
  }
}
