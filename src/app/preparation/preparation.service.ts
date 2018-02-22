
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../config/app.config';
@Injectable()
export class PreparationService {
  private catsUrl: string;
  private allQuesUrl: string;
  constructor(private http: Http) {
    this.catsUrl = AppConfig.endpoints.cats;
    this.allQuesUrl = AppConfig.endpoints.allQues;
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
}
