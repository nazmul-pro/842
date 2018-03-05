import { Component, OnInit } from '@angular/core';
import { PreparationService } from '../preparation/preparation.service';

import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-warmup',
  templateUrl: './warmup.component.html',
  styleUrls: ['./warmup.component.css']
})
export class WarmupComponent implements OnInit {
  running: boolean;
  finished: boolean;
  notStarted: boolean;
  stoped: boolean;
  result: {}
  cats: any;
  warmQues: any[]
  constructor(private preServ: PreparationService) {
    this.notStarted = true;
    // this.running = false;
    // this.stoped = false;
    // this.result = {}
   }

  ngOnInit() {
    this.preServ.getCats((data) => {
      if (data) {
        this.cats = data;
      }  
    });
    
  }
  getWarmQues(cat, nmbr) {
    this.preServ.getWarmQues((data) => {
      if (data) {
        this.warmQues = data;
        this.running = true;
        this.notStarted = false;
        
      }
    },cat, nmbr)
  }
  checkExist(item, ans) {
    if(item.checked==ans) {
      return true;
    }
    else {
      return false;
    }

  }
  checkAnswer(item, ans) {
    if (item && ans) {
      item.checked = ans;
    }
  }

  finishExam() {
    var cAns = 0, wAns = 0, nAns = 0;
    var ques = this.warmQues;
    for(let qI=0; qI < ques.length; qI++) {
      if (ques[qI].checked) {
        if (ques[qI].checked === ques[qI].opR) {
          cAns++;
        }
        else {
          wAns++;          
        }
      }
      else {
        nAns++;
      }
    }
    var tMarks = cAns - (wAns*0.5);
    this.result = {
      "tQues": ques.length,
      "cAns" : cAns,
      "wAns"  : wAns,
      "nAns"  : nAns,
      "tMarks": tMarks

    }
    console.log(this.result);
    
    this.running = false;
    this.finished = true;
  }
}
