import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Services } from '@angular/core/src/view';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app';
  back1 = 'assets/image/bd3.jpg';
  back2 = 'assets/image/pexels2.jpeg';
  office = 'assets/image/office.jpg';
  analyze = 'assets/image/analyze.jpg';
  study = 'assets/image/study.jpg';
  date;
  constructor (private service: HomeService, private http: Http){
  }

  ngOnInit() {
    this.date = this.service.showTodayDate();
    console.log("this.date");
    this.http.get("./assets/data/admin-ques/questions.json").
      map((response) => response.json()).
      subscribe((data) => console.log(data));
      var f= {
        "title": "ggg",
        "description": "all pro",
        "unit": "20",
        "minQuantity": 2
      }
      this.http.get('http://127.0.0.1:8000/families/').
      map((response) => response.json()).
      subscribe((data) => console.log(data)
      )
  }

}
