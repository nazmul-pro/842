import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeService } from './home/home.service';
import { ExamListService } from './exam-list/exam-list.service';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimeLeftDirective } from './time-left.directive';

const appRoutes: Routes = [
  { path: 'exams', component: ExamListComponent },
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ExamListComponent,
    HomeComponent,
    TimeLeftDirective
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule
  ],
  providers: [HomeService, ExamListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
