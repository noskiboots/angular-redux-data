import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as actions from './ard-transaction.actions';
import {ArdTransaction} from './ard-transaction';
export const ardTransactionAdapter = createEntityAdapter<ArdTransaction>();

export interface ArdTransactionState extends EntityState<ArdTransaction> {
}

export const initialState: ArdTransactionState = ardTransactionAdapter.getInitialState();

export function ardTransaction(state: ArdTransactionState = initialState,
                                      action) {
    switch (action.type) {
        case actions.actionStrings.ADD_ALL:
            return ardTransactionAdapter.addAll(action.data, state);
        case actions.actionStrings.ADD_ONE:
            return ardTransactionAdapter.addOne(action.data, state);
        case actions.actionStrings.UPDATE_SUCCESS:
            return ardTransactionAdapter.updateOne({id: action.resource.id, changes: action.resource}, state);
        default:
            return state;
    }
}

export const getArdTransactionState = createFeatureSelector<ArdTransactionState>('ardTransaction');

export const {
    selectIds,
    selectAll,
    selectTotal
} = ardTransactionAdapter.getSelectors(getArdTransactionState);

export const getEntityById = (id: string | number) => (state: ArdTransactionState) => {
    if (state) {
        return state.entities[id];
    }
    return undefined;
}

export const getArdTransactionEntityById = (id: string | number) => createSelector(getArdTransactionState, getEntityById(id));
