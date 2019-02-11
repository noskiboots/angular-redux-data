import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReduxDataActionsService} from './redux-services/redux-data.actions.service';
import {ReduxDataSelectorsService} from './redux-services/redux-data.selectors.service';
import {AngularReduxDataServiceConfig} from './redux-services/angular-redux-data-service-config';
import {AngularReduxDataLayerModule} from './angular-redux-data-layer.module';
import {ardTransaction} from './redux-transactions/ard-transaction.reducer';
import {AngularReduxDataService} from './redux-services/angular-redux-data.service';

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
    static forRoot(ardConfiguration: AngularReduxDataServiceConfig): ModuleWithProviders {
        return {
            ngModule: AngularReduxDataModule,
            providers: [
                {provide: AngularReduxDataServiceConfig, useValue: ardConfiguration}
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
