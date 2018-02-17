import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeService } from './home/home.service';
import { ExamListService } from './exam-list/exam-list.service';
import { LiveService } from './live/live.service';
import { PagerService } from './shared/pager.service';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimeLeftDirective } from './time-left.directive';
import { LiveComponent } from './live/live.component';
const appRoutes: Routes = [
  { path: 'exams', component: ExamListComponent },
  { path: '', component: HomeComponent },
  { path: 'live/:date/:time', component: LiveComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ExamListComponent,
    HomeComponent,
    LiveComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule
  ],
  providers: [HomeService, ExamListService, LiveService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
