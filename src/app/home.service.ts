import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

  constructor() { }
  showTodayDate() {
    let ndate = new Date();
    return ndate;
 }
}
