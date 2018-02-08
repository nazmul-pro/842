
import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Services } from '@angular/core/src/view';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  date;
  constructor (private service: HomeService, private http: Http){
  }
  ngOnInit() {
    this.date = this.service.showTodayDate();
    console.log("this.date");
    this.http.get("./assets/data/admin-ques/questions.json").
      map((response) => response.json()).
      subscribe((data) => console.log(data));
  }
}
