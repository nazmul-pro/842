import { Component, OnInit } from '@angular/core';
import { ExamListService } from './exam-list.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  private eftExamList : any;
  private list: number[] = [1,2,3];
  constructor(private service: ExamListService ) { }

  ngOnInit() {
    this.getExamList();
  }
  
  getExamList() {
    this.service.getEftExamList(this.myCB, this);
  }
  myCB(data, th){
    
    th.list = [1,2,3,4];
    th.eftExamList = data;
    console.log(data);
  }

}
