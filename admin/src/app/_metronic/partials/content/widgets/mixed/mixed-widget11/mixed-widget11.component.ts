import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mixed-widget11',
  templateUrl: './mixed-widget11.component.html',
})
export class MixedWidget11Component {
  @Input() cssClass: '';
  @Input() title: string = '';
  @Input() value: any = '';
  constructor() { }
}
