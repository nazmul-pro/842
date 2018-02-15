import { Component, OnInit } from '@angular/core';
import { ExamListService } from './exam-list.service';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { log } from 'util';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  private adminExamList : any = [];
  private usersExamList : any = [];
  private list: number[] = [1,2,3];
  countDown;
  counter;
  constructor(private service: ExamListService ) { }

  ngOnInit() {
    this.getExamList();
    // this.getTimer(null);
  }
  
  getExamList() {
    this.service.getEftExamList(this.myCB, this);
  }
  myCB(data, th){
    var length = data.length;
    for(var i=0;i<length;i++){
      if(data[i] && data[i].isAdmin){
        th.adminExamList.push(data[i]);
        th.getTimer(data[i]);
      }
      else if(data[i] && data[i].isAdmin==false){
        th.usersExamList.push(data[i]);
        th.getTimer(data[i]);
      }
    }
    th.eftExamList = data;
  }

  getTimer(exam){
    console.log("ran")
    var counter = 600;  
    var countDown = Observable.timer(0,1000)
      .take(counter)
      .map(() => --counter);
      exam.left = countDown;
      
  }

}
