import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {RxDataEffectI} from '../../../../projects/angular-redux-data/src/lib/rx-data-utilities/rx-data.effects.interface';
import {RxDataActionsService} from '../../../../projects/angular-redux-data/src/lib/rx-data-services/rx-data.actions.service';
import {DataLayerService} from '../../../../projects/angular-redux-data/src/lib/data-services/data-layer.service';

@Injectable()
export class CommentEffects implements RxDataEffectI {
    @Effect() findAll$;
    @Effect() findRecord$;
    @Effect() create$;
    @Effect() delete$;
    @Effect() update$;

    constructor(private actions$: Actions, private actionsService: RxDataActionsService,
                private _dataLayerService: DataLayerService) {
        this.findAll$ = this.actionsService.findAllResource$(actions$, _dataLayerService, 'comment');
        this.findRecord$ = this.actionsService.findRecordResource$(actions$, _dataLayerService, 'comment');
        this.create$ = this.actionsService.createResource$(actions$, _dataLayerService, 'comment');
        this.delete$ = this.actionsService.deleteResource$(actions$, _dataLayerService, 'comment');
        this.update$ = this.actionsService.updateResource$(actions$, _dataLayerService, 'comment');
    }
}
