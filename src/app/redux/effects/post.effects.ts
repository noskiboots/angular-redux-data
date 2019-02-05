import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {RxDataEffectI} from '../../../../projects/angular-redux-data/src/lib/redux-data-utilities/redux-data.effects.interface';
import {ReduxDataActionsService} from '../../../../projects/angular-redux-data/src/lib/redux-data-services/redux-data.actions.service';
import {DataLayerService} from '../../../../projects/angular-redux-data/src/lib/data-services/data-layer.service';
import {Store} from '@ngrx/store';
import {HttpHeaders} from '@angular/common/http';
import {RequestConfiguration} from '../../../../projects/angular-redux-data/src/lib/data-adapters/request-configuration';

@Injectable()
export class PostEffects implements RxDataEffectI {
    @Effect() findAll$;
    @Effect() findRecord$;
    @Effect() create$;
    @Effect() delete$;
    @Effect() update$;
    @Effect() queryAll$;
    entityNamespace = 'posts';

    constructor(private actions$: Actions,
                private actionsService: ReduxDataActionsService,
                private _dataLayerService: DataLayerService,
                private _store: Store<any>) {
        this._store.select('uiState').subscribe(uiState$ => {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${uiState$.token}`);
            const config = new RequestConfiguration();
            config.headers = headers;
            this.findAll$ = this.actionsService.findAllResource$(actions$, _dataLayerService, this.entityNamespace, config);
            this.findRecord$ = this.actionsService.findRecordResource$(actions$, _dataLayerService, this.entityNamespace, config);
            this.queryAll$ = this.actionsService.queryAllResource$(actions$, _dataLayerService, this.entityNamespace, config);
            this.create$ = this.actionsService.createResource$(actions$, _dataLayerService, this.entityNamespace, config);
            this.delete$ = this.actionsService.deleteResource$(actions$, _dataLayerService, this.entityNamespace, config);
            this.update$ = this.actionsService.updateResource$(actions$, _dataLayerService, this.entityNamespace, config);
        });
    }
}
