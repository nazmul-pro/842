import { Component, OnInit } from '@angular/core';
import { LiveService } from './live.service';
import { PagerService } from '../shared/pager.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LiveService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.getParams();

  }
  getParams() {
    this.route.params.subscribe( params =>
      this.getQuestions(params));
  }
  getQuestions(p) {
    this.service.getQues((data) => {
      if(data) {
        const length = data.length;
        this.allItems = data;
        this.setPage(1);
      }      
    }, p);
  }
 
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  checkOption(item, op) {
    console.log(item + op);

  }

  }
