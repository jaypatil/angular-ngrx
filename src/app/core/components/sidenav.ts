import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidenav',
  template: `
    <div>
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
    div {
      width: 300px;
    }
  `,
  ],
})
export class SidenavComponent {
  @Input() open = false;
}
