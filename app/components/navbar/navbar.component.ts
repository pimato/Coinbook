import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){

  }


  goBack(){
    console.log("back");
    let link = ['/settings'];
    this.router.navigate(link);
  }
}
