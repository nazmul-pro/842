import { Component, OnInit } from '@angular/core';
import { PreparationService } from '../preparation/preparation.service';

import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-warmup',
  templateUrl: './warmup.component.html',
  styleUrls: ['./warmup.component.css']
})
export class WarmupComponent implements OnInit {
  private running: boolean;
  private notStarted: boolean;
  private stoped: boolean;
  cats: any;
  warmQues: any[]
  constructor(private preServ: PreparationService) {
    this.notStarted = true;
    this.running = false;
    this.stoped = false;
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
}
