import { Component } from '@angular/core';

@Component({
  selector: 'layout',
  template: `
    <div fullscreen>

      <ng-content></ng-content>

    </div>
  `,
  styles: [
    `
    div {
      background: rgba(0, 0, 0, 0.03);
    }

    *, /deep/ * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `,
  ],
})
export class LayoutComponent {}
