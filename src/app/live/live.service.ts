import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LiveService {
  constructor(private http: Http) { }
  getQues(cb: (d, th) => void, th) {
    this.http.get('./assets/data/admin-ques/questions.json').
      map((response) => response.json()).
      subscribe((data) => cb(data['data'], th));
      // handle error call back , retry https://angular.io/guide/http
      // subscribe((data) => cb(data['data'], th),
      // error => this.error = error);
  }
}
