import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'book-detail',
  template: `
    <div *ngIf="book">
      <div>
        <div>{{ title }}</div>
        <div *ngIf="subtitle">{{ subtitle }}</div>
        <img div-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </div>
      <div>
        <p [innerHtml]="description"></p>
      </div>
      <div class="footer">
        <book-authors [book]="book"></book-authors>
      </div>
      <div align="start">
        <button mat-raised-button color="warn" *ngIf="inCollection" (click)="remove.emit(book)">
        Remove Book from Collection
        </button>

        <button mat-raised-button color="primary" *ngIf="!inCollection" (click)="add.emit(book)">
        Add Book to Collection
        </button>
      </div>
    </div>

  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    div {
      max-width: 600px;
    }
    div {
      margin-left: 0;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    div {
      margin: 15px 0 50px;
    }
    div {
      margin: 25px 0 0 !important;
    }
    div {
      padding: 0 25px 25px;
      position: relative;
    }
  `,
  ],
})
export class BookDetailComponent {
  /**
   * Presentational components receive data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() book: Book;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();

  /**
   * Tip: Utilize getters to keep templates clean
   */
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

  get thumbnail() {
    return (
      this.book.volumeInfo.imageLinks &&
      this.book.volumeInfo.imageLinks.smallThumbnail
    );
  }
}
