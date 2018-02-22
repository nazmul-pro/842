import { Component, OnInit } from '@angular/core';
import { ExamListService } from './exam-list.service';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  private adminExamList: any = [];
  private usersExamList: any = [];
  private list: number[] = [1, 2, 3];
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
  myCB(data, th) {
    const length = data.length;
    for (let i = 0; i < length; i++) {
      if(data[i].date && data[i].startTime) {
        let newDate = data[i].date.replace(/-/g, "").substr(0,8);
        let newTime = data[i].startTime.replace(/:/g, "").substr(0,4);
        data[i].linkDate = newDate;
        data[i].linkTime = newTime;
      }
      if (data[i] && data[i].isAdmin) {        
        th.adminExamList.push(data[i]);
        th.getTimer(data[i]);
      } else if (data[i] && data[i].isAdmin === false) {
        th.usersExamList.push(data[i]);
        th.getTimer(data[i]);
      }
    }
    th.eftExamList = data;
  }

  getTimer(exam) {
    const today1 = new Date().toISOString().slice(0,10);
    const examDay1 = exam.date;
    const today = new Date(today1);
    const examDay = new Date(examDay1);
    const diff = Math.abs(today.getTime() - examDay.getTime());
    if (diff === 0) {
      let counter;
      let countDown: any;
      this.getMsDiff(exam, function(t) {
        if (t > 0) {
          counter = t;
          countDown = Observable.timer(0, 1000)
            .take(counter)
            .map(() => --counter, console.log(counter));
            exam.left = countDown;
            // console.log(counter);
            if (exam.left < 30 && exam.left + parseInt(exam.duration) * 60 < 1) {
              console.log(exam.left);
              
              counter = null;
              countDown = null;
              exam.left = 'It\'s Over';
            } else if (exam.left < 10 && exam.left + parseInt(exam.duration) * 60  >= 1) {
              counter = null;
              countDown = null;
              exam.left = 'Exam is running...';
            }
        } 
      });
    } else if (diff > 0) {
      exam.left = exam.date;
    }
  }
  getMsDiff(exam, callBack) {
    const examInS = parseInt(exam.startTime.split(":")[0]) * 3600 + parseInt(exam.startTime.split(":")[1]) * 60;
    const todayInS = new Date().getHours() * 3600 + new Date().getMinutes() * 60;
    callBack(examInS - todayInS);
  }

}
