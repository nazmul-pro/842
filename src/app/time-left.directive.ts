import { Directive, Output } from '@angular/core';

@Directive({
  selector: '[appTimeLeft]'
})
export class TimeLeftDirective {
  // @Output() appTimeLeft
  constructor() { }
  ngOnInit() { 
    console.log("ran")
 }
}
