import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class SigninService {

  private BASE_URL: string = 'http://localhost:8000';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}

  login(user): Promise<any> {
    let url: string = `${this.BASE_URL}/auth-jwt/`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  register(user): Promise<any> {
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  ensureAuthenticated(token): Promise<any> {
    let url: string = `${this.BASE_URL}/families/`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

}
