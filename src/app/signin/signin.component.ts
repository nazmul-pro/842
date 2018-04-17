import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SigninService } from './signin.service';
import { Http } from '@angular/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  requestType: number;
  email: string
  password: string
  isLoggedIn: boolean
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: SigninService,
    private http: Http
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        console.log(user.json());
        if (user.json().status === 'success') {
          this.isLoggedIn = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
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

  login(name, password){
    if (name && password) {
      let user = {"username": name, "password": password};
      // this.auth.login(user);
      this.auth.login(user).then((user) => {
        console.log(user);
        localStorage.setItem('token', JSON.parse(user._body).token);
        this.getfam(1);
      })
      .catch((err) => {
        console.log(err);
        this.getfam(0);
      });
    }   
    
  }
  getfam(n){
    console.log(this.isLoggedIn);
    
    this.http.get('http://localhost:8000/families/').
        map((response) => response.json()).
        subscribe((data) => console.log(n)
        
      )
  }

}
