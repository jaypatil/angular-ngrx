import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as CollectionActions from '../actions/collection.actions';
import { Book } from '../models/book';
import * as fromBooks from '../reducers';

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
