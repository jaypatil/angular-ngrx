import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './core/containers/not-found-page';
import { AuthGuard } from './auth/services/auth-guard.service';
import { SelectivePreloadingStrategy } from './core/selective-preloading-strategy';

export const routes: Routes = [
    { path: '', redirectTo: '/checkout', pathMatch: 'full' },
    {
        path: 'checkout',
        loadChildren: './checkout/checkout.module#CheckOutModule',
        data: { preload: true }
    },
    {
        path: 'books',
        loadChildren: './books/books.module#BooksModule',
        canActivate: [AuthGuard],
    },
    { path: '**', component: NotFoundPageComponent },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true, enableTracing: true, // <-- debugging purposes only
            preloadingStrategy: SelectivePreloadingStrategy,
        }),
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/