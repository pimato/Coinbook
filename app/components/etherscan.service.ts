import {Injectable, Provider} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EtherscanService{

  API_KEY = 'MUEAXNRIRPZXEJ9E28CHJKJ8YHH12UCNA5';

  constructor(private _http:Http){
    console.log('Etherscan service ready');
  }

  ngOnInit(){

  }

  getBalance(address:string){
    var url = 'https://api.etherscan.io/api?module=account&action=balance&address='+address+'&tag=latest&apikey='+ this.API_KEY;
       return this._http.get(url)
         .map(res => res.json());
  }

  getRepos(){
    // return this._http.get('http://api.github.com/users/' + this.username + '/repos').map(res => res.json());
  }

}
