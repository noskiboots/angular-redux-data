import {ActionReducerMap} from '@ngrx/store';
import {createEntityAdapter} from '@ngrx/entity';
import {getEntityActionStrings} from '../redux-utilities/redux-data.actions.strings';
import {ardTransaction} from '../redux-transactions/ard-transaction.reducer';
import {AngularReduxDataServiceConfig} from '../redux-services/angular-redux-data-service-config';

export class EntityReducer {
    actionStrings;
    nameSpace;
    adapter;
    initialState;
    reducer;

    constructor(actionStrings, nameSpace) {
        this.actionStrings = actionStrings;
        this.nameSpace = nameSpace;
        this.adapter = createEntityAdapter();
        const _initialState = this.adapter.getInitialState();
        this.initialState = _initialState;
        this['reducer'] = (state = _initialState, action) => {
            return this._reducer(state, action);
        };
    }

    private _reducer(state = this.initialState, action) {
        switch (action.type) {
            case this.actionStrings.FIND_ALL_SUCCESS:
                return this.adapter.addAll(action.data, state);
            case this.actionStrings.QUERY_ALL_SUCCESS:
                return this.adapter.addAll(action.data, state);
            case this.actionStrings.FIND_RECORD_SUCCESS:
                return this.adapter.addOne(action.data, state);
            case this.actionStrings.UPDATE_SUCCESS:
                return this.adapter.updateOne({id: action.data.id, changes: action.data}, state);
            case this.actionStrings.CREATE_SUCCESS:
                return this.adapter.addOne(action.data, state);
            case this.actionStrings.DELETE_SUCCESS:
                return this.adapter.removeOne(action.data.id, state);
            case this.actionStrings.SUCCESS:
                return this.adapter.addOne(action.resource, state);
            default:
                return state;
        }
    }
}

export class ReduxDataReducerFactory {
    static getReducers(config: AngularReduxDataServiceConfig) {
        const dynamicEntityReducers: ActionReducerMap<any> = {};
        config.entityNameSpaces.forEach(nameSpace => {
            const newInstance = new EntityReducer(getEntityActionStrings(nameSpace), nameSpace);
            dynamicEntityReducers[nameSpace] = newInstance.reducer;
        });

        if (config.customReducers && Object.keys(config.customReducers).length > 0) {
            Object.keys(config.customReducers).forEach(key => {
                dynamicEntityReducers[key] = config.customReducers[key];
            });
        }
        const transactionInstance = new EntityReducer(getEntityActionStrings('ardTransaction'), 'ardTransaction');
        dynamicEntityReducers['ardTransaction'] = transactionInstance.reducer;
        return dynamicEntityReducers;
    }
}
