import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    error404: '404'
  },
  endpoints: {
    cats: './assets/data/categories/cats.json',
    allQues: './assets/data/admin-ques/questions.json'
  }
};
