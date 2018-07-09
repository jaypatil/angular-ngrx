import { Component, Input } from '@angular/core';
import { Book } from '../models/book';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'book-preview-list',
  template: `
    <book-preview *ngFor="let book of books" [book]="book"></book-preview>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})
export class BookPreviewListComponent {
  @Input() books: Book[];
}
