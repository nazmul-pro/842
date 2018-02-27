
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../config/app.config';
@Injectable()
export class PreparationService {
  private catsUrl: string;
  private allQuesUrl: string;
  private finalQues: any;
  constructor(private http: Http) {
    this.catsUrl = AppConfig.endpoints.cats;
    this.allQuesUrl = AppConfig.endpoints.allQues;
    this.finalQues = [];
   }
  getCats(callBack: (d) => void) {
    this.http.get(this.catsUrl).
      map((response) => response.json()).
      subscribe((data) => callBack(data)
      );
  }
  getPrepQues(callBack: (d) => void, catId) {
    if (catId) {
      this.http.get(this.allQuesUrl).
      map((response) => response.json()).
      subscribe((data) => this.getQuesByCat(callBack, data['data'], catId)
      );
    }
    
  }
  getQuesByCat(callBack, data, catId) {
    if (data && catId && Array.isArray(data)) {
      var quesById = [];
      const qL = data.length;
      for (let qI = 0; qI < qL; qI++) {
        if (data[qI] && data[qI].catId==catId) {
          quesById.push(data[qI])
        }        
      }
      callBack(quesById);
    }
  }

  getWarmQues(callBack: (d) => void, catId, nmbr) {
    if (catId && nmbr) {
      this.http.get(this.allQuesUrl).
      map((response) => response.json()).
      subscribe((data) => this.getWarmQuesByCat(callBack, data['data'], catId, nmbr)
      );
    }    
    
  }
  getWarmQuesByCat(callBack, allQues, catId, nmbr) {
    if (allQues && allQues.length>0) {
      var quesByCat = [];
      const length = allQues.length;
      for(let wqI=0; wqI < length; wqI++) {
        if (allQues[wqI] && allQues[wqI].catId===catId) {
          quesByCat.push(allQues[wqI]);
        }
      }
      this.makeWarmQues(callBack, quesByCat, nmbr);
    }
  }
  makeWarmQues(callBack, quesByCat, nmbr) {
    if (nmbr && quesByCat) {      
      for(let fwqI=0; fwqI < nmbr; fwqI++) {
        this.getRandQues(quesByCat);        
      }
      callBack(this.finalQues);
      this.finalQues = []
    }
  }
  getRandQues(quesByCat) {
    let randomItem = quesByCat[Math.floor(Math.random()*quesByCat.length)];
    for(let quesI=0; quesI<this.finalQues.length; quesI++) {
      if (this.finalQues[quesI].EFT_ID===randomItem.EFT_ID) {
        this.getRandQues(quesByCat);
        return;
      }
    }
    this.finalQues.push(randomItem);
  }
}
