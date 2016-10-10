import { Component } from '@angular/core';
import { StorageSync, StorageStrategy } from 'angular2-storage-sync';


@Component({
  selector: 'my-app',
  template:`
    <input type="checkbox"  [(ngModel)]="remember"> Remember me
    <button (click)="setItems()">Set items</button>
<ul>
  <li *ngFor="let item of items">
  {{item.id}}
</li>
</ul>`
})
export class AppComponent {
  @StorageSync('rememberMe') remember: boolean = false;

  @StorageSync(null, StorageStrategy.Session) items: Array<Object> = [];

  setItems() {
    // this is always sync with your storage
    this.items = [{id: 1}, {id: 2}];
  }
}
