import { Component, OnInit } from '@angular/core';
import { PreparationService } from './preparation.service';
import { PagerService } from '../shared/pager.service';
@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {
  cats: any;
  questions: any[];
  // array of all items to be paged
  // private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(private preServ: PreparationService,              
              private pagerService: PagerService) { }

  ngOnInit() {
    this.preServ.getCats((data) => {
      if (data) {
        this.cats = data;
        this.preServ.getPrepQues((ques) => {
          if (ques) {
            this.questions = ques;
            this.setPage(1);
          }  
        }, data[3].EFT_ID);
      }  
    });
    
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.questions.length, page);

    // get current page of items
    this.pagedItems = this.questions.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
