import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReduxDataActionsService} from './redux-data-services/redux-data.actions.service';
import {ReduxDataSelectorsService} from './redux-data-services/redux-data.selectors.service';
import {ReduxDataServiceConfig} from './redux-data-services/redux-data-service-config';
import {AngularReduxDataLayerModule} from './angular-redux-data-layer.module';
import {ardTransaction} from './redux-data-transactions/ard-transaction.reducer';
import {AngularReduxDataService} from './redux-data-services/angular-redux-data.service';

@NgModule({
    imports: [CommonModule,
        AngularReduxDataLayerModule
    ],
    providers: [
        ReduxDataActionsService,
        ReduxDataSelectorsService,
        AngularReduxDataService
    ],
})
export class AngularReduxDataModule {
    static forRoot(ardConfiguration: ReduxDataServiceConfig): ModuleWithProviders {
        return {
            ngModule: AngularReduxDataModule,
            providers: [
                {provide: ReduxDataServiceConfig, useValue: ardConfiguration}
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
