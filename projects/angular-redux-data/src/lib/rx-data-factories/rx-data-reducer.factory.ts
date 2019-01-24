import * as inflection from 'inflection';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {createEntityAdapter} from '@ngrx/entity';
import {getEntityActionStrings} from '../rx-data-utilities/rx-data.actions.utils';

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
        this.initialState = this.adapter.getInitialState();
        this['reducer'] = (state = createEntityAdapter().getInitialState(), action) => {
            return this._reducer(state, action);
        };
    }

    private _reducer(state = this.initialState, action) {
        switch (action.type) {
            case this.actionStrings.ADD_ALL:
                return this.adapter.addAll(action.data, state);
            case this.actionStrings.ADD_ONE:
                return this.adapter.addOne(action.data, state);
            case this.actionStrings.UPDATE_SUCCESS:
                return this.adapter.updateOne({id: action.data.id, changes: action.data}, state);
            case this.actionStrings.SUCCESS:
                return this.adapter.addOne(action.resource, state);
            default:
                return state;
        }
    }
}

export class RxDataReducerFactory {
    static getReducers(nameSpaceArray: string[], customReducers?) {
        const dynamicEntityReducers: ActionReducerMap<any> = {};
        nameSpaceArray.forEach(nameSpace => {
            const newInstance = new EntityReducer(getEntityActionStrings(nameSpace), nameSpace);
            dynamicEntityReducers[nameSpace] = newInstance.reducer;
        });
        if (customReducers) {
            Object.keys(customReducers).forEach(key => {
                dynamicEntityReducers[key] = customReducers[key];
            });
        }
        return dynamicEntityReducers;
    }
}
