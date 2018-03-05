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
    var today2 = new Date();
    today2.setHours(today2.getHours() + 6);
    const today1 = today2.toISOString().slice(0,10);
    
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
            .map(() => --counter, function (x) {  });
            
            var subscription = countDown.subscribe(
              function (x) {
                // exam.left = counter;
                var hours   = Math.floor(counter / 3600);
                var minutes = Math.floor((counter - (hours * 3600)) / 60);
                var seconds = counter - (hours * 3600) - (minutes * 60);

                // if (hours   < 10) {hours   = "0"+hours;}
                // if (minutes < 10) {minutes = "0"+minutes;}
                // if (seconds < 10) {seconds = "0"+seconds;}
                var time    = hours+':'+minutes+':'+seconds + ' left';
                exam.left = time;
              },
              function (err) {
                  console.log('Error: ' + err);   
              },
              function () {
                exam.left = 'Exam is running...';
                // this.fireWhenFinish(t, exam)
                   
              });
            
        } 
        else if(t <= 0 && t+exam.duration*60 > 0) {
          exam.left = 'Exam is running.. :)';
          // this.fireWhenFinish(t, exam)

        }
        else {
          exam.left = 'It\'s Over.. :(';
        }
      });
    } else if (diff > 0) {
      exam.left = exam.date;
      exam.isOver = true;
    }
  }
  getMsDiff(exam, callBack) {
    const examInS = parseInt(exam.startTime.split(":")[0]) * 3600 + parseInt(exam.startTime.split(":")[1]) * 60;
    const todayInS = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();
    callBack(examInS - todayInS);
  }

  fireWhenFinish(t, exam) {
    if (t && exam) {
      var countDown = Observable.timer(0, t+exam.duration*60*1000)
    .take(1)
    .map(() => exam.left="It's Over :(");
    }    
  }



}
