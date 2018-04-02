import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nav-item',
  template: `
    <a  [routerLink]="routerLink" (click)="navigate.emit()">
      <div>{{ icon }}</div>
      <span ><ng-content></ng-content></span>
      <span  class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [
    `
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
  `,
  ],
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
