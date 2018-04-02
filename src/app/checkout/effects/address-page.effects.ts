import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import {
    AddressPage,
    AddressPageSuccess,
    AddressPageFailure,
    AddressPageActionTypes,
} from '../actions/address-page';
import { Address } from '../models/address';

@Injectable()
export class AddressPageEffects {
    @Effect()
    address$ = this.actions$.pipe(
        ofType(AddressPageActionTypes.AddressPage),
        tap((action: AddressPage) => console.log(action.payload)),
    );

    @Effect({ dispatch: false })
    addressSuccess$ = this.actions$.pipe(
        ofType(AddressPageActionTypes.AddressPageSuccess),
        tap(() => this.router.navigate(['checkout','payment']))
    );

    // @Effect({ dispatch: false })
    // addressRedirect$ = this.actions$.pipe(
    //     ofType(AddressPageActionTypes.AddressPageRedirect),
    //     tap(authed => {
    //         this.router.navigate(['/login']);
    //     })
    // );

    constructor(
        private actions$: Actions,
        private router: Router
    ) { }
}
