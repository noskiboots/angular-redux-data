import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {RxDataEffectI} from '../../../../projects/angular-redux-data/src/lib/rx-data-utilities/rx-data.effects.interface';
import {RxDataActionsService} from '../../../../projects/angular-redux-data/src/lib/rx-data-services/rx-data.actions.service';
import {DataLayerService} from '../../../../projects/angular-redux-data/src/lib/data-services/data-layer.service';

@Injectable()
export class PostEffects implements RxDataEffectI {
    @Effect() findAll$;
    @Effect() findRecord$;
    @Effect() create$;
    @Effect() delete$;
    @Effect() update$;

    constructor(private actions$: Actions, private actionsService: RxDataActionsService,
                private _dataLayerService: DataLayerService) {
        this.findAll$ = this.actionsService.findAllResource$(actions$, _dataLayerService, 'post');
        this.findRecord$ = this.actionsService.findRecordResource$(actions$, _dataLayerService, 'post');
        this.create$ = this.actionsService.createResource$(actions$, _dataLayerService, 'post');
        this.delete$ = this.actionsService.deleteResource$(actions$, _dataLayerService, 'post');
        this.update$ = this.actionsService.updateResource$(actions$, _dataLayerService, 'post');
    }
}
