import {Injectable, Optional} from '@angular/core';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as _ from 'lodash';
import {ReduxDataServiceConfig} from './redux-data-service-config';
import {createEntityAdapter} from '@ngrx/entity';

export class EntitySelector {
    getEntityById: any;
    getEntities: any;
    getAllEntities: any;
    getTotal: any;
    getIds: any;
    selectById: any;
    selectEntities: any;
    selectIds: any;
    selectAll: any;
    selectTotal: any;
}

@Injectable({
    providedIn: 'root',
})
export class ReduxDataSelectorsService {
    private _selectors: EntitySelector[] = [];
    private _entityNameSpaces = [];

    get selectors(): EntitySelector[] {
        return this._selectors;
    }

    public getSelector(nameSpace): EntitySelector {
        return this._selectors[nameSpace];
    }

    constructor(@Optional() entityConfig: ReduxDataServiceConfig) {
        if (entityConfig) {
            this._entityNameSpaces = entityConfig.entityNameSpaces;
            this.selectorsFactory();
        }
    }

    selectorsFactory() {
        this._entityNameSpaces.forEach(nameSpace => {
            const adapter = createEntityAdapter();
            adapter.getInitialState();
            const entitySelector = this._selectors[nameSpace] = new EntitySelector();
            entitySelector.getEntityById = (id) =>
                state => {
                    if (state) {
                        return state.entities[id];
                    }
                    return undefined;
                };
            entitySelector.getAllEntities = () =>
                state => {
                    if (state) {
                        return _.values(state.entities);
                    }
                    return undefined;
                };
            entitySelector.getEntities = () =>
                state => {
                    if (state) {
                        return state.entities;
                    }
                };
            entitySelector.getIds = () =>
                state => {
                    if (state) {
                        return state.ids;
                    }
                };
            entitySelector.getTotal = () =>
                state => {
                    if (state) {
                        return state.ids.length;
                    }
                };
            entitySelector.selectById = (id: string | number) =>
                createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getEntityById(id));
            entitySelector.selectAll = () => createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getAllEntities());
            entitySelector.selectEntities = () =>  createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getEntities());
            entitySelector.selectIds = () => createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getIds());
            entitySelector.selectTotal = () =>  createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getTotal());
        });
    }

}
