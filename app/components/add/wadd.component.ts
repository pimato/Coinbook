import { Component } from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {Wallet} from '../wallet.model';


@Component({
  moduleId: module.id,
  selector: 'wadd',
  templateUrl: 'wadd.component.html'
})
export class WalletAddComponent {

  wallet:Wallet;
  key:any;

  constructor(private storage:LocalStorageService) {}

  saveValue() {
    this.wallet = new Wallet();
    var portfolio:Wallet[] = this.storage.retrieve('portfolio');

    if(portfolio == null){
      portfolio = [];
    }

    this.wallet.name = 'Wallet';
    this.wallet.publicKey = this.key;
    this.wallet.balance = 120;
    this.wallet.value = 0;
    portfolio.push(this.wallet);


    this.storage.store('portfolio', portfolio);
    console.log(portfolio + " saved into local storage");
  }

  clearStorage(){
    this.storage.clear();
    console.log("Storage cleared");
    console.log(this.storage.retrieve('portfolio'));
  }
}
