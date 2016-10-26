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

  private wallets:Wallet[];

  constructor(private _ethService:EtherscanService, private storage:LocalStorageService) {}

  ngOnInit() {

    this.wallets = JSON.parse(this.storage.retrieve('portfolio'));
  //  console.log('Wallet received:' + this.wallets[0].balance);
    /*
    console.log(this.wallets);
    var ethBalance = ethunits.convert(87674950000000000,"wei","ether");
    var w = new Wallet();
    w.balance = ethBalance;
    console.log("Balance :" + w.balance);
*/

    this.storage.observe('portfolio')
      .subscribe((value:any) => {
        this.wallets = JSON.parse(value);
        this.fetchBalance();
      });


    if(this.wallets != null){
    this.fetchBalance();
    }

  }

  fetchBalance() {
    this._ethService.getBalances(this.wallets).subscribe(res => {
      for(var i = 0; i < res.result.length;i++){
        this.wallets[i].balance = ethunits.convert(res.result[i].balance,"wei","ether");
      }
    });

  }
}
