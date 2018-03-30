import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromBooks from '../reducers';
import * as CollectionActions from '../actions/collection';
import { Book } from '../models/book';

@Component({
  selector: 'collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div>My Collection</div>
    </div>

    <book-preview-list [books]="books$ | async"></book-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
    div {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class CollectionPageComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private store: Store<fromBooks.State>) {
    this.books$ = store.pipe(select(fromBooks.getBookCollection));
  }

  ngOnInit() {
    this.store.dispatch(new CollectionActions.Load());
  }
}
