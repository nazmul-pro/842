import { Component, OnInit } from '@angular/core';
import { PreparationService } from '../preparation/preparation.service';

import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-warmup',
  templateUrl: './warmup.component.html',
  styleUrls: ['./warmup.component.css']
})
export class WarmupComponent implements OnInit {
  cats: any;
  warmQues: any[]
  constructor(private preServ: PreparationService) { }

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
        console.log(data);
        
      }
    },cat, nmbr)
  }
}
