import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { format } from 'url';

@Injectable()
export class LiveService {
  left: number=null;
  constructor(private http: Http) { }
  getQues(cb: (d, l) => void, params) {
    if(params && params.date && params.time){
      let date = params.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
      let time = params.time.replace(/(\d{2})(\d{2})/, "$1:$2");
      this.getExamLists((list) => {
        if(list){
          this.getExamByDateTime((exam) => {
            if(exam){
              this.checkDateTimeValidity(cb, exam);
            }
          },list, date, time);
        }
      }, date, time);
      
    }
  }
  getExamLists(callBack, date, time) {
    this.http.get('./assets/data/exams/exam-list.json').
      map((response) => response.json()).
      subscribe((data) => callBack(data['data']));
  }
  getExamByDateTime(callBack, data, date, time) {
    if(data && date && time){
      if(data.length > 0){
        const length = data.length;
        for (let i = 0; i < length; i++) {
          if(data[i].date && data[i].startTime){
            if(data[i].date==date && data[i].startTime==time) {
              callBack(data[i]);
              break;
            }
          }
          if(i===length-1) {
            callBack(null);
          }
        }
      }
    }
  }
  checkDateTimeValidity(cb, exam) {
    const today1 = new Date().toISOString().slice(0,10);
    const examDay1 = exam.date;
    const today = new Date(today1);
    const examDay = new Date(examDay1);
    const diff = Math.abs(today.getTime() - examDay.getTime());
    if (diff === 0) {
      const examInSec = parseInt(exam.startTime.split(":")[0]) * 3600 + parseInt(exam.startTime.split(":")[1]) * 60;
      const todayInSec = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();
      let timeDiff = examInSec - todayInSec;
      this.left = timeDiff;
      if(timeDiff<0 && exam.examId) { // Write some logic later
        this.getQuesIdsByExamId(cb, exam.examId);
      }
      else {
        cb(null, this.left);
      }
    }
  }
  getQuesIdsByExamId(cb, examId) {
    this.http.get('./assets/data/live-questions/questions.json').
      map((response) => response.json()).
      subscribe((data) => 
      this.makeQuesIds((ids) => {
        if(ids) {
          this.getQuesByIds(cb, ids);
        }
      }, data['data'], examId)
    );
  }
  makeQuesIds(callBack, liveQ, examId) {
    if(liveQ && examId){
      var ids = [];
      const lQlength =  liveQ.length;
      for (let i = 0; i < lQlength; i++) {
        if(liveQ[i].examId==examId) {
          ids.push(liveQ[i].questionId);
        }        
      }
      callBack(ids);
    }
    else {
      callBack(null);
    }
  }
  getQuesByIds(cb, ids) {
    this.http.get('./assets/data/admin-ques/questions.json').
      map((response) => response.json()).
      subscribe((data) => this.filterQues(cb, data['data'], ids))
  }
  filterQues(cb, data, ids) {
    if(data && ids) {
      var filteredData = [];
      const idL = ids.length;
      const dataL = data.length;
      for (let j = 0; j < idL; j++) {
        for (let k = 0; k < dataL; k++) {
          if(ids[j] == data[k].EFT_ID) {
            filteredData.push(data[k]);
          }          
        }        
      }
      console.log(filteredData);
      
      cb(filteredData, this.left);
    }
  }

}
