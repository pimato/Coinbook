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

  ngOnInit(){

  }

  getBalances(wallets:Wallet[]){
    var address:string;
    var temp ="";
    for(var i = 0; i < wallets.length; i++){
      temp = temp + wallets[i].publicKey + ",";
      console.log(temp);
    }
    temp = temp.replace(/,(\s+)?$/, '');
    console.log(temp);

    var url = 'https://api.etherscan.io/api?module=account&action=balancemulti&address='+temp+'&tag=latest&apikey='+ this.API_KEY;
       return this._http.get(url)
         .map(res => res.json());
  }

  getRepos(){
    // return this._http.get('http://api.github.com/users/' + this.username + '/repos').map(res => res.json());
  }

}
