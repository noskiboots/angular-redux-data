import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {RxDataEffectI} from '../../../../projects/angular-redux-data/src/lib/redux-data-utilities/redux-data.effects.interface';
import {ReduxDataActionsService} from '../../../../projects/angular-redux-data/src/lib/redux-data-services/redux-data.actions.service';
import {DataLayerService} from '../../../../projects/angular-redux-data/src/lib/data-services/data-layer.service';

@Injectable()
export class ClientEffects implements RxDataEffectI {
    @Effect() findAll$;
    @Effect() findRecord$;
    @Effect() create$;
    @Effect() delete$;
    @Effect() update$;
    @Effect() queryAll$;

    constructor(private actions$: Actions, private actionsService: ReduxDataActionsService,
                private _dataLayerService: DataLayerService) {
        this.findAll$ = this.actionsService.findAllResource$(actions$, _dataLayerService, 'client');
        this.findRecord$ = this.actionsService.findRecordResource$(actions$, _dataLayerService, 'client');
        this.queryAll$ = this.actionsService.queryAllResource$(actions$, _dataLayerService, 'client');
        this.create$ = this.actionsService.createResource$(actions$, _dataLayerService, 'client');
        this.delete$ = this.actionsService.deleteResource$(actions$, _dataLayerService, 'client');
        this.update$ = this.actionsService.updateResource$(actions$, _dataLayerService, 'client');
    }
}