import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: '/checkout', pathMatch: 'full' },
  {
    path: 'checkout',
    loadChildren: './checkout/checkout.module#CheckOutModule',
  },
  {
    path: 'books',
    loadChildren: './books/books.module#BooksModule',
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];
