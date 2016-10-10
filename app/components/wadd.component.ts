import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'wadd',
  templateUrl: 'wadd.component.html'
})
export class WalletAddComponent {


  saveWallet(){
    console.log(document.getElementById('wallet-input').innerHTML);
  }
}
