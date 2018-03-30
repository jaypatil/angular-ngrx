import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'book-search',
  template: `
    <div>
      <div>Find a Book</div>
      <div>
        <div>
          <input matInput placeholder="Search for a book" [value]="query" (keyup)="search.emit($event.target.value)">
        </div>
        <mat-spinner [class.show]="searching" [diameter]="30" [strokeWidth]="3"></mat-spinner>
      </div>
      <div-footer><span *ngIf="error">{{error}}</span></div-footer>
    </div>
  `,
  styles: [
    `
    div,
    div,
    div-footer {
      display: flex;
      justify-content: center;
    }

    div-footer {
      color: #FF0000;
      padding: 5px 0;
    }

    .mat-form-field {
      min-width: 300px;
    }

    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      padding-left: 60px; // Make room for the spinner
    }

    .mat-spinner.show {
      opacity: 1.0;
    }
  `,
  ],
})
export class BookSearchComponent {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();
}
