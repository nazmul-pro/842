import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExamListService {
  constructor(private http: Http) { }
  getEftExamList(cb: (d, th) => void, th){
    this.http.get("./assets/data/exams/exam-list.json").
      map((response) => response.json()).
      subscribe((data) => cb(data.data, th));
  }
}
