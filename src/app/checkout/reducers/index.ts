import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromRoot from '../../reducers';
  import * as fromAddress from './address';
  import * as fromAddressPage from './address-page';
  
  export interface AddressState {
    status: fromAddress.State;
    addressPage: fromAddressPage.State;
  }
  
  export interface State extends fromRoot.State {
    addressState: AddressState;
  }
  
  export const reducers: ActionReducerMap<AddressState> = {
    status: fromAddress.reducer,
    addressPage: fromAddressPage.reducer,
  };
  
  export const selectAddressState = createFeatureSelector<AddressState>('addressState');
  
  export const selectAddressStatusState = createSelector(
    selectAddressState,
    (state: AddressState) => state.status
  );
  export const getIsShipping = createSelector(
    selectAddressStatusState,
    fromAddress.getIsShipping
  );
  export const getAddress = createSelector(selectAddressStatusState, fromAddress.getAddress);
  
  export const selectAddressFormPageState = createSelector(
    selectAddressState,
    (state: AddressState) => state.addressPage
  );
  export const getAddressFormPageError = createSelector(
    selectAddressFormPageState,
    fromAddressPage.getError
  );
  export const getAddressFormPagePending = createSelector(
    selectAddressFormPageState,
    fromAddressPage.getPending
  );
  