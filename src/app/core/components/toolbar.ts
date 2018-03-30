import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toolbar',
  template: `
    <div color="primary">
      <button div-button (click)="openMenu.emit()">
        <div>menu</div>
      </button>
      <ng-content></ng-content>
    </div>
  `,
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
