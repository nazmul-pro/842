import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  requestType: number;
  email: string
  password: string
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRequestType();    
  }
  getRequestType() {
    if (this.router.url) {
      if (this.router.url.split('/')[1]=='login') {
        this.requestType = 1;
      }
      else if(this.router.url.split('/')[1]=='signup'){
        this.requestType = 0;
      }
    }
  }

  login(name, email, password){
    
    
  }

}
