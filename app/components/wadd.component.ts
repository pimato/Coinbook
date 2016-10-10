import { Component } from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';


@Component({
  moduleId: module.id,
  selector: 'wadd',
  templateUrl: 'wadd.component.html'
})
export class WalletAddComponent {

  wallet:any;

  constructor(private storage:LocalStorageService) {}

  saveValue() {
    this.storage.store('boundValue', this.wallet);
    console.log(this.wallet + " saved into local storage");
  }
}
