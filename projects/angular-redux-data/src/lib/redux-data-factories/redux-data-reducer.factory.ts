import {ActionReducerMap, createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {createEntityAdapter} from '@ngrx/entity';
import {getEntityActionStrings} from '../redux-data-utilities/redux-data.actions.strings';

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

export class ReduxDataReducerFactory {
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
