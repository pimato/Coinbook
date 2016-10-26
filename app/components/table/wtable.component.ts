import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {EtherscanService} from '../etherscan.service';
import 'rxjs/add/operator/map';
import {Wallet} from '../wallet.model';

var ethunits = require('ethereum-units');

@Component({
  moduleId: module.id,
  selector: 'wtable',
  templateUrl: 'wtable.component.html'
})
export class WalletTableComponent implements OnInit{

  private ethunits = require('ethereum-units');
  private wallets:Wallet[];

  constructor(private _ethService:EtherscanService, private storage:LocalStorageService) {}

  ngOnInit() {
    this.wallets = this.storage.retrieve('portfolio');
    console.log(this.wallets);

    this.storage.observe('portfolio')
      .subscribe((value:any) => {
        this.wallets = value;
        this.fetchBalance();
      });
    /*


    for(var wallet in this.wallets){
      console.log(wallet.name);
      this._ethService.getBalance(wallet.name).subscribe(res => {
        var weiBalance = res.result;
        var ethBalance = ethunits.convert(weiBalance,"wei","ether");
        wallet.balance = ethBalance;
      });
    }*/
   // console.log("Number"+ weiNumber);
   // console.log("Eth"+ ethunits.convert(weiNumber, "ether","wei"));
    //  this._infuraService.printAccountBalance();
    //this.attribute = this.storage.retrieve('portfolio');
    //console.log(this.attribute);

  }

  fetchBalance() {

    // standard for loop
    for (var i = 0; i < this.wallets.length; i++) {
      this._ethService.getBalance(this.wallets[i].publicKey).subscribe(res => {
        var weiBalance = res.result;
        console.log(weiBalance);
        var ethBalance = ethunits.convert(weiBalance, "wei", "ether");
       // this.wallets[i].balance = ethBalance;
        console.log(ethBalance);
      //  console.log("Wallet" + this.wallets[i]);
      });
    }
  }
  /*
    for(let wallet:Wallet in this.wallets){
      this._ethService.getBalance(wallet.balance).subscribe(res => {
        var weiBalance = res.result;
        var ethBalance = ethunits.convert(weiBalance,"wei","ether");
        wallet.balance = ethBalance;
      }
    }

  */
}
