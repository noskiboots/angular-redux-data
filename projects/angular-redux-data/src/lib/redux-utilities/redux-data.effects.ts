import {Actions, Effect} from '@ngrx/effects';
import {ReduxDataActionsService} from '../redux-services/redux-data.actions.service';
import {DataLayerService} from '../data-services/data-layer.service';

export abstract class AngularReduxDataEffect {
    @Effect() findAll$;
    @Effect() findRecord$;
    @Effect() create$;
    @Effect() delete$;
    @Effect() update$;
    @Effect() queryAll$;

    protected constructor(protected actions$: Actions, protected actionsService: ReduxDataActionsService,
                protected dataLayerService: DataLayerService, protected entityNamespace: string) {
        this.findAll$ = this.actionsService.findAllResource$(actions$, dataLayerService, entityNamespace);
        this.findRecord$ = this.actionsService.findRecordResource$(actions$, dataLayerService, entityNamespace);
        this.queryAll$ = this.actionsService.queryAllResource$(actions$, dataLayerService, entityNamespace);
        this.create$ = this.actionsService.createResource$(actions$, dataLayerService, entityNamespace);
        this.delete$ = this.actionsService.deleteResource$(actions$, dataLayerService, entityNamespace);
        this.update$ = this.actionsService.updateResource$(actions$, dataLayerService, entityNamespace);
    }
}

