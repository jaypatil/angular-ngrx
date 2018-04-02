import { AddressPageActionsUnion, AddressPageActionTypes } from './../actions/address-page';
import { Address } from '../models/address';

export interface State {
    isShipping: boolean;
    address: Address | null;
}

export const initialState: State = {
    isShipping: false,
    address: null,
};

export function reducer(state = initialState, action: AddressPageActionsUnion): State {
    switch (action.type) {
        case AddressPageActionTypes.AddressPageSuccess: {
            return {
                ...state,
                isShipping: action.payload.address.isShippingAddress,
                address: action.payload.address,
            };
        }

        // case AddressPageActionTypes.Logout: {
        //   return initialState;
        // }

        default: {
            return state;
        }
    }
}

export const getIsShipping = (state: State) => state.isShipping;
export const getAddress = (state: State) => state.address;
