import { Component } from '@angular/core';
import {LocalStorageService} from 'ng2-webstorage';


@Component({
  moduleId: module.id,
  selector: 'wtable',
  templateUrl: 'wtable.component.html'
})
export class WalletTableComponent {

  attribute:any[];

  constructor(private storage:LocalStorageService) {
    this.retrieveValue();
  }


  retrieveValue() {
    this.attribute = this.storage.retrieve('boundValue');
    console.log(this.attribute);
  }

}
