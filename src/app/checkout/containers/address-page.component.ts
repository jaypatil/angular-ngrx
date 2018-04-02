import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CheckOut } from '../models/checkout';
import { Router } from '@angular/router';

@Component({
    selector: 'address-page',
    template: `
    <address-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </address-form>
  `,
    styles: [],
})
export class AddressPageComponent implements OnInit {
    pending$ //= this.store.pipe(select(fromAuth.getLoginPagePending));
    error$ //= this.store.pipe(select(fromAuth.getLoginPageError));

    constructor(private router: Router) { }

    ngOnInit() { }

    onSubmit($event: CheckOut) {
      this.router.navigate(['checkout','payment']);  
    }
}
