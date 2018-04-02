import { Component, Input } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'book-preview',
  template: `
    <a [routerLink]="['/books', id]">
      <div>
        <div>
          <img div-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
          <div>{{ title | bcEllipsis:35 }}</div>
          <div *ngIf="subtitle">{{ subtitle | bcEllipsis:40 }}</div>
        </div>
        <div>
          <p *ngIf="description">{{ description | bcEllipsis }}</p>
        </div>
        <div>
          <book-authors [book]="book"></book-authors>
        </div>
      </div>
    </a>
  `,
  styles: [
    `
    :host {
      display: flex;
    }

    :host a {
      display: flex;
    }

    div {
      width: 400px;
      margin: 15px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
      div {
        margin: 15px 0 !important;
      }
    }
    div:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    div {
      margin-right: 10px;
    }
    div {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    div {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    div {
      padding: 0 25px 25px;
    }
  `,
  ],
})
export class BookPreviewComponent {
  @Input() book: Book;

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get thumbnail(): string | boolean {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail;
    }

    return false;
  }
}
