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
  constructor(private preServ: PreparationService) { }

  ngOnInit() {
    this.preServ.getCats((data) => {
      if (data) {
        this.cats = data;
      }  
    });
    
  }
}
