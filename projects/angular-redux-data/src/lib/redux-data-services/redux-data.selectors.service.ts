import {Injectable, Optional} from '@angular/core';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as _ from 'lodash';
import {ReduxDataServiceConfig} from './redux-data-service-config';
import {createEntityAdapter} from '@ngrx/entity';

export class EntitySelector {
    getEntityById: any;
    getEntitiesByIds: any;
    getEntitiesByParameters: any;
    getEntities: any;
    getAllEntities: any;
    getTotal: any;
    getIds: any;
    selectById: any;
    selectByIds: any;
    selectByParameters: any;
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
                };
            entitySelector.getEntitiesByIds = (ids: string[]) =>
                state => {
                    if (state) {
                        const entities = _.values(state.entities);
                        return entities.filter(entity => ids.indexOf(entity.id) > -1);
                    }
                };
            entitySelector.getEntitiesByParameters = (params: {}) =>
                state => {
                    if (state) {
                        let filteredEntities = _.values(state.entities);
                        Object.keys(params).forEach(key => {
                            filteredEntities = filteredEntities.filter(entity => {
                                if (entity[key]) {
                                    return entity[key] === params[key];
                                }
                                return false;
                            });
                        });
                        return filteredEntities;
                    }
                };
            entitySelector.getAllEntities = () =>
                state => {
                    if (state) {
                        return _.values(state.entities);
                    }
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
            entitySelector.selectByIds = (ids: string[]) =>
                createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getEntitiesByIds(ids));
            entitySelector.selectByParameters = (params: any) =>
                createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getEntitiesByParameters(params));
            entitySelector.selectAll = () => createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getAllEntities());
            entitySelector.selectEntities = () => createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getEntities());
            entitySelector.selectIds = () => createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getIds());
            entitySelector.selectTotal = () => createSelector(createFeatureSelector(nameSpace), this._selectors[nameSpace].getTotal());
        });
    }

}
