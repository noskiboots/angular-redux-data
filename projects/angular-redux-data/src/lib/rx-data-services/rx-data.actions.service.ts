import {Injectable, Optional} from '@angular/core';
import * as entityActions from '../rx-data-utilities/rx-data.actions';
import {getEntityActionStrings} from '../rx-data-utilities/rx-data.actions.utils';
import {Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {RxDataServiceConfig} from './rx-data-service-config';
import {Observable} from 'rxjs';
import {DataLayerService} from '../data-services/data-layer.service';

export class EntityActions {
    actionStrings: any;
}

@Injectable({
    providedIn: 'root',
})
export class RxDataActionsService {
    private _actions = [];
    private _entityNameSpaces = [];

    get actions() {
        return this._actions;
    }

    constructor(@Optional() entityConfig: RxDataServiceConfig) {
        if (entityConfig) {
            this._entityNameSpaces = entityConfig.entityNameSpaces;
            this.actionsFactory();
        }
    }

    actionsFactory() {
        this._entityNameSpaces.forEach(nameSpace => {
            if (!this._actions[nameSpace]) {
                this._actions[nameSpace] = Object.assign(new EntityActions(), entityActions);
            }
        });
        this.actionsStringsFactory();
    }

    private actionsStringsFactory() {
        Object.keys(this._actions).forEach(key => {
            this._actions[key].actionStrings = getEntityActionStrings(key);
        });
    }

    private extend<T, U>(first: T, second: U): T & U {
        const result = <T & U>{};
        for (const id in first) {
            if (id) {
                (<any>result)[id] = (<any>first)[id];
            }
        }
        for (const id in second) {
            if (!result.hasOwnProperty(id)) {
                (<any>result)[id] = (<any>second)[id];
            }
        }
        return result;
    }

    public findAllResource$(actions$: Actions,
                            dataLayerService: DataLayerService,
                            resourceType,
                            config?): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.FIND_ALL),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType].findAll(action['resource'], config);
                }),
                map(data$ => {
                    return new this.actions[resourceType].AddAll(resourceType, data$);
                })
            );
    }

    public findRecordResource$(actions$: Actions, dataLayerService: DataLayerService, resourceType: string): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.FIND_RECORD),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType].findRecord(action['resource'], +action['id']);
                }),
                map(data$ => {
                    return new this.actions[resourceType].AddOne(resourceType, data$);
                })
            );
    }

    public queryAllResource$(actions$: Actions, dataLayerService: DataLayerService, resourceType: string): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.QUERY_ALL),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType].queryAll(action['resource'], action['params']);
                }),
                map(data$ => {
                    return new this.actions[resourceType].AddAll(resourceType, data$);
                })
            );
    }

    public updateResource$(actions$: Actions, dataLayerService: DataLayerService, resourceType: string): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.UPDATE),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType].updateRecord(action['resource'], +action['id'], action['changes']);
                }),
                map(data$ => {
                    return new this.actions[resourceType].UpdateSuccess(resourceType, data$);
                })
            );
    }

    public createResource$(actions$: Actions, dataLayerService: DataLayerService, resourceType: string): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.CREATE),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType].createRecord(action['resource'], action['data']);
                }),
                map(data$ => {
                    return new this.actions[resourceType].Success();
                })
            );
    }

    public deleteResource$(actions$: Actions, dataLayerService: DataLayerService, resourceType: string): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.DELETE),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType].deleteRecord(action['resource'], action['id']);
                }),
                map(data$ => {
                    return new this.actions[resourceType].Success();
                })
            );
    }


}
