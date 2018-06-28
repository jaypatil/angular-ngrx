import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidenav',
  template: `
      <div>
        <ng-content></ng-content>
      </div>
  `,
  styles: [
    `
    mat-sidenav {
      width: 300px;
    }
  `,
  ],
})
export class SidenavComponent {
  @Input() open = false;
}
