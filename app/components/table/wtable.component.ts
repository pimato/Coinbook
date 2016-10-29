import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {EtherscanService} from '../services/etherscan.service';
import 'rxjs/add/operator/map';
import {Wallet} from '../wallet.model';


// Import everything from 'wampy', and store
// it under a local variable of wampy

var ethunits = require('ethereum-units');
declare var Wampy: any;


@Component({
  moduleId: module.id,
  selector: 'wtable',
  templateUrl: 'wtable.component.html'
})
export class WalletTableComponent implements OnInit{

  private ws:any;
  private wallets:Wallet[];
  private data:any;

  constructor(private _ethService:EtherscanService, private storage:LocalStorageService) {}

  ngOnInit() {
    //restore wallets
    this.wallets = JSON.parse(this.storage.retrieve('portfolio'));

    //subscribe to changes for example if a new wallet is getting added
    this.storage.observe('portfolio')
      .subscribe((value:any) => {
        this.wallets = JSON.parse(value);
        this.fetchBalance();
      });

    //update balance
    if(this.wallets != null){
    this.fetchBalance();
      this.test();
    }

  }

  fetchBalance() {
    this._ethService.getBalances(this.wallets).subscribe(res => {
      for(var i = 0; i < res.result.length;i++){
        var weiBalance = res.result[i].balance;
        var ethBalance = ethunits.convert( weiBalance, 'wei', 'ether');
        this.wallets[i].balance = Math.round(ethBalance*100000)/100000;
      }
    });

  }

  test(){
    this.ws = new Wampy('wss://api.poloniex.com', {realm: "realm1"});
    this.ws.onopen = () => {
      //
      //subscribe to currency pair
      //this data type is not correct
      //while other data looks normal
      //
      this.ws
        .subscribe('USDT_ETH',(data:any) => {
        console.log(data[0].data.rate);
          for(var i = 0; i < this.wallets.length;i++){
            var price = data[0].data.rate;
            var calc = this.wallets[i].balance * price;
            this.wallets[i].value = Math.round(calc*100)/100;
        //document.getElementById("event").innerHTML=JSON.stringify(data);
            }
      });
    };
    this.ws.onopen()
  }







}
