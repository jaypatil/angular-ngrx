import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CheckOut } from '../models/checkout';

@Component({
    selector: 'payment-page',
    template: `
    <payment-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </payment-form>
  `,
    styles: [],
})
export class PaymentPageComponent implements OnInit {
    pending$ //= this.store.pipe(select(fromAuth.getLoginPagePending));
    error$ //= this.store.pipe(select(fromAuth.getLoginPageError));

    constructor() { }

    ngOnInit() { }

    onSubmit($event: CheckOut) {
     
    }
}
