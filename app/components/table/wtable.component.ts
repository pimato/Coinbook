import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';
import {EtherscanService} from '../services/etherscan.service';
import 'rxjs/add/operator/map';
import {Wallet} from '../wallet.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

var ethunits = require('ethereum-units');
declare var Wampy: any;
var stringify = require('json-stringify-safe');


@Component({
  moduleId: module.id,
  selector: 'wtable',
  templateUrl: 'wtable.component.html',
})
export class WalletTableComponent implements OnInit{

  private ws:any;
  private wallets:Wallet[];
  private data:any;
  key:string;

  constructor(private _ethService:EtherscanService, private storage:LocalStorageService, private modalService: NgbModal) {}

  ngOnInit() {
    //restore wallets
    this.wallets = JSON.parse(this.storage.retrieve('portfolio'));

    //subscribe to changes for example if a new wallet is getting added
    this.storage.observe('portfolio')
      .subscribe((value:any) => {
        this.wallets = JSON.parse(value);
        if(this.wallets != null){
        this.fetchBalance();
          this.test();
        }
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
    this.ws.options({
      reconnectInterval: 1000,
      maxRetries: 999,
      onConnect: function () { console.log('Yahoo! We are online!'); },
      onClose: function () { console.log('See you next time!'); },
      onError: function () { console.log('Breakdown happened'); },
      onReconnect: function () { console.log('Reconnecting...'); },
      onReconnectSuccess: function () { console.log('Reconnection succeeded...'); }
    });
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
          }
      });
    };
    this.ws.onopen()
  }

  saveWallet() {

    console.log("added");
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
    this.key = "";
  }

  clearStorage(){
    this.ws.disconnect();
    this.storage.clear();
    console.log("Storage cleared");
  }


  open(content:any) {
    this.modalService.open(content).result.then((result: any) => {
      if (result == "add") {
        this.saveWallet();
      } else if (result == "cancel") {
        this.key = '';
      }
    });
  }

}
