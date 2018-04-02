import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Address } from '../models/address';

import * as fromAddress from '../reducers';
import * as AddressPageActions from '../actions/address-page';



@Component({
  selector: 'address-page',
  template: `
  <div class="row">
    <div class="col-50">
      <h3>Billing Address</h3>
        <address-form
          (submitted)="onSubmit($event)"
          [pending]="pending$ | async"
          [errorMessage]="error$ | async">
        </address-form>
    </div>
  </div>
  `,
  styles: [],
})
export class AddressPageComponent implements OnInit {
  
  pending$ = this.store.pipe(select(fromAddress.getAddressFormPagePending));
  error$ = this.store.pipe(select(fromAddress.getAddressFormPageError));

  constructor(private store: Store<fromAddress.State>) { }

  ngOnInit() { }

  onSubmit($event: Address) {
    this.store.dispatch(new AddressPageActions.AddressPage($event));
  }
}
