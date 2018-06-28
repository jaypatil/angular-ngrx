import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'toolbar',
  template: `
    <div>
      <button (click)="openMenu.emit()">
        <div>menu</div>
      </button>
      <ng-content></ng-content>
    </div>
  `,
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
