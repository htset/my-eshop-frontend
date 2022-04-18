import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appAnalytics]'
})
export class AnalyticsDirective{

  @Input("events") events:string = "";

  constructor(private el: ElementRef,
              private router: Router) { }

  @HostListener('click') onClick() {
    if(this.events.indexOf('click') >= 0){
      this.logEvent("click");
    }
  }

  @HostListener('change') onInput() {
    if(this.events.indexOf('change') >= 0){
      this.logEvent("change");
    }
  }

  @HostListener('blur') onBlur() {
    if(this.events.indexOf('blur') >= 0){
      this.logEvent("blur");
    }
  }

  logEvent(eventName: string){
    console.log("Event: " + eventName);
    console.log("Element ID: " + this.el.nativeElement.id);
    console.log("Element value: " + this.el.nativeElement.value)
    console.log("Page: " + this.router.url)
  }
}
