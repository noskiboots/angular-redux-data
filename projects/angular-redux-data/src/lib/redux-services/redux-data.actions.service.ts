import {Injectable, Optional} from '@angular/core';
import * as entityActions from '../redux-utilities/redux-data.actions';
import {getEntityActionStrings} from '../redux-utilities/redux-data.actions.strings';
import {Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AngularReduxDataServiceConfig} from './angular-redux-data-service-config';
import {Observable, of} from 'rxjs';
import {DataLayerService} from '../data-services/data-layer.service';
import {flatMap} from 'rxjs/internal/operators';
import * as _ from 'lodash';
import {RequestConfiguration} from '../data-adapters/request-configuration';

export class EntityActions {
    actionStrings: any;
}

@Injectable({
    providedIn: 'root',
})
export class ReduxDataActionsService {
    private _actions = [];
    private _entityNameSpaces = [];

    get actions() {
        return this._actions;
    }

    constructor(@Optional() entityConfig: AngularReduxDataServiceConfig) {
        if (entityConfig) {
            this._entityNameSpaces = entityConfig.entityNameSpaces;
            this._entityNameSpaces.push('ardTransaction');
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
                            config?: RequestConfiguration): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.FIND_ALL),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType]
                        .findAll(action['resource'], config)
                        .pipe(
                            flatMap((data$: any[]) => {
                                return [
                                    new this.actions[resourceType].FindAllSuccess(resourceType, data$),
                                    new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                        id: action['transactionId'],
                                        success: true,
                                        entities: _.map(data$, 'id'),
                                    })
                                ];
                            }),
                            catchError(error => {
                                return of(error).pipe(
                                    flatMap(() => {
                                        return [new this.actions[resourceType].FindAllFailed(resourceType, action),
                                            new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                                id: action['transactionId'],
                                                failed: true,
                                                error: error,
                                                updatedAt: Date.now()
                                            })];
                                    })
                                );
                            })
                        );
                })
            );
    }

    public findRecordResource$(actions$: Actions,
                               dataLayerService: DataLayerService,
                               resourceType: string,
                               config?: RequestConfiguration): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.FIND_RECORD),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType]
                        .findRecord(action['resource'], +action['id'], config)
                        .pipe(
                            flatMap((data$: {}) => {
                                return [
                                    new this.actions[resourceType].FindRecordSuccess(resourceType, data$),
                                    new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                        id: action['transactionId'],
                                        success: true,
                                        entities: [data$['id']]
                                    })
                                ];
                            }),
                            catchError(error => {
                                return of(error).pipe(
                                    flatMap(() => {
                                        return [new this.actions[resourceType].FindRecordFailed(resourceType, action),
                                            new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                                id: action['transactionId'],
                                                failed: true,
                                                error: error,
                                                updatedAt: Date.now()
                                            })];
                                    })
                                );
                            })
                        );
                }),
            );
    }

    public queryAllResource$(actions$: Actions,
                             dataLayerService: DataLayerService,
                             resourceType: string,
                             config?: RequestConfiguration): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.QUERY_ALL),
                switchMap((action) => {
                    const requestConfiguration = !!config ? config : new RequestConfiguration();
                    requestConfiguration.parameters = action['params'];
                    return dataLayerService.adapters[resourceType]
                        .queryAll(action['resource'],
                            requestConfiguration)
                        .pipe(
                            flatMap((data$: any[]) => {
                                return [
                                    new this.actions[resourceType].QueryAllSuccess(resourceType, data$),
                                    new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                        id: action['transactionId'],
                                        success: true,
                                        entities: _.map(data$, 'id'),
                                        updatedAt: Date.now()
                                    })
                                ];
                            }),
                            catchError(error => {
                                return of(error).pipe(
                                    flatMap(() => {
                                        return [new this.actions[resourceType].QueryAllFailed(resourceType, action),
                                            new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                                id: action['transactionId'],
                                                failed: true,
                                                error: error,
                                                updatedAt: Date.now()
                                            })];
                                    })
                                );
                            })
                        );
                }),
            );
    }

    public updateResource$(actions$: Actions,
                           dataLayerService: DataLayerService,
                           resourceType: string,
                           config?: RequestConfiguration): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.UPDATE),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType]
                        .updateRecord(action['resource'],
                            +action['id'],
                            action['changes'],
                            config)
                        .pipe(
                            flatMap((data$: any[]) => {
                                return [
                                    new this.actions[resourceType].UpdateSuccess(resourceType, data$),
                                    new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                        id: action['transactionId'],
                                        success: true,
                                        entities: [data$['id']],
                                        updatedAt: Date.now()
                                    })
                                ];
                            }),
                            catchError(error => {
                                return of(error).pipe(
                                    flatMap(() => {
                                        return [new this.actions[resourceType].UpdateFailed(resourceType, action),
                                            new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                                id: action['transactionId'],
                                                failed: true,
                                                error: error,
                                                updatedAt: Date.now()
                                            })];
                                    })
                                );
                            })
                        );
                }),
            );
    }

    public createResource$(actions$: Actions,
                           dataLayerService: DataLayerService,
                           resourceType: string,
                           config?: RequestConfiguration): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.CREATE),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType]
                        .createRecord(action['resource'],
                            action['data'],
                            config)
                        .pipe(
                            flatMap((data$: any[]) => {
                                return [
                                    new this.actions[resourceType].CreateSuccess(resourceType, data$),
                                    new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                        id: action['transactionId'],
                                        success: true,
                                        entities: [data$['id']],
                                        updatedAt: Date.now()
                                    })
                                ];
                            }),
                            catchError(error => {
                                return of(error).pipe(
                                    flatMap(() => {
                                        return [new this.actions[resourceType].CreateFailed(resourceType, action),
                                            new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                                id: action['transactionId'],
                                                failed: true,
                                                error: error,
                                                updatedAt: Date.now()
                                            })];
                                    })
                                );
                            })
                        );
                }),
            );
    }

    public deleteResource$(actions$: Actions,
                           dataLayerService: DataLayerService,
                           resourceType: string,
                           config?: RequestConfiguration): Observable<Action> {
        return actions$
            .pipe(
                ofType(this.actions[resourceType].actionStrings.DELETE),
                switchMap((action) => {
                    return dataLayerService.adapters[resourceType]
                        .deleteRecord(action['resource'],
                            action['id'],
                            config)
                        .pipe(
                            map(data$ => {
                                return new this.actions[resourceType].DeleteSuccess(resourceType, {id: action['id']});
                            }),
                            catchError(error => {
                                return of(error).pipe(
                                    flatMap(() => {
                                        return [new this.actions[resourceType].DeleteFailed(resourceType, action),
                                            new this.actions['ardTransaction'].UpdateSuccess('ardTransaction', {
                                                id: action['transactionId'],
                                                failed: true,
                                                error: error,
                                                updatedAt: Date.now()
                                            })];
                                    })
                                );
                            })
                        );
                }),
            );
    }


}
