import { Action } from '@ngrx/store';
import { Address } from '../models/address';

export enum AddressPageActionTypes {
  AddressPage = '[AddressPage] AddressPage',
  AddressPageSuccess = '[AddressPage] AddressPage Success',
  AddressPageFailure = '[AddressPage] AddressPage Failure',
  AddressPageRedirect = '[AddressPage] AddressPage Redirect',
}

export class AddressPage implements Action {
  readonly type = AddressPageActionTypes.AddressPage;

  constructor(public payload: Address) { }
}

export class AddressPageSuccess implements Action {
  readonly type = AddressPageActionTypes.AddressPageSuccess;

  constructor(public payload: { address : Address }) { }
}

export class AddressPageFailure implements Action {
  readonly type = AddressPageActionTypes.AddressPageFailure;

  constructor(public payload: any) { }
}

export class AddressPageRedirect implements Action {
  readonly type = AddressPageActionTypes.AddressPageRedirect;
}

export type AddressPageActionsUnion =
  | AddressPage
  | AddressPageSuccess
  | AddressPageFailure
  | AddressPageRedirect
