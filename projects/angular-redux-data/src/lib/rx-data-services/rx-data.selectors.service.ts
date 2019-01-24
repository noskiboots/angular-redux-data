import {Injectable, Optional} from '@angular/core';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as _ from 'lodash';
import {RxDataServiceConfig} from './rx-data-service-config';

export class EntitySelector {
    getEntityById: any;
    getEntities: any;
    getResourceEntityById: any;
    selectById: any;
    selectIds: any;
    selectAll: any;
    selectTotal: any;
}

@Injectable({
    providedIn: 'root',
})
export class RxDataSelectorsService {
    private _selectors: EntitySelector[] = [];
    private _entityNameSpaces = [];

    get selectors(): EntitySelector[] {
        return this._selectors;
    }

    public getSelector(nameSpace): EntitySelector {
        return this._selectors[nameSpace];
    }

    constructor(@Optional() entityConfig: RxDataServiceConfig) {
        if (entityConfig) {
            this._entityNameSpaces = entityConfig.entityNameSpaces;
            this.selectorsFactory();
        }
    }

    selectorsFactory() {
        this._entityNameSpaces.forEach(nameSpace => {
            const dynamicState = createFeatureSelector(nameSpace);
            const entitySelector = this._selectors[nameSpace] = new EntitySelector();
            entitySelector.getEntityById = (id) =>
                state => {
                    if (state) {
                        return state.entities[id];
                    }
                    return undefined;
                };
            entitySelector.getEntities = () =>
                state => {
                debugger
                    if (state) {
                        return _.values(state.entities);
                    }
                    return undefined;
                };
            entitySelector.getResourceEntityById = (id) =>
                createSelector(dynamicState, this._selectors[nameSpace].getEntityById(id));
            entitySelector.selectById = (id: string | number) =>
                createSelector(dynamicState, this._selectors[nameSpace].getEntityById(id));
            entitySelector.selectAll = () => createSelector(dynamicState, this._selectors[nameSpace].getEntities());
        });
    }

}
