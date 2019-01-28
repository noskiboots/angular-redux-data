import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReduxDataActionsService} from './redux-data-services/redux-data.actions.service';
import {ReduxDataSelectorsService} from './redux-data-services/redux-data.selectors.service';
import {ReduxDataServiceConfig} from './redux-data-services/redux-data-service-config';

@NgModule({
    imports: [CommonModule],
    providers: [
        ReduxDataActionsService,
        ReduxDataSelectorsService,
    ],
})
export class AngularReduxDataModule {
    static forRoot(entityConfig: ReduxDataServiceConfig): ModuleWithProviders {
        return {
            ngModule: AngularReduxDataModule,
            providers: [
                {provide: ReduxDataServiceConfig, useValue: entityConfig}
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: AngularReduxDataModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

}
