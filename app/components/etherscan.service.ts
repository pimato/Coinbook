import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Wallet} from "./wallet.model";

@Injectable()
export class EtherscanService{

  API_KEY = 'MUEAXNRIRPZXEJ9E28CHJKJ8YHH12UCNA5';

  constructor(private _http:Http){
    console.log('Etherscan service ready');
  }

  getBalances(wallets:Wallet[]){

    var address ="";

    //generate a string with every public key from the wallets array
    for(var i = 0; i < wallets.length; i++){
      address = address + wallets[i].publicKey + ",";
    }
    //remove the last comma from the string
    address = address.replace(/,(\s+)?$/, '');

    var url = 'https://api.etherscan.io/api?module=account&action=balancemulti&address='+address+'&tag=latest&apikey='+ this.API_KEY;
       return this._http.get(url)
         .map(res => res.json());
  }


}
