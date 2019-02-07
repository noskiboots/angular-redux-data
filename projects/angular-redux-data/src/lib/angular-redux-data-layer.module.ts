import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataLayerService} from './data-services/data-layer.service';
import {DataLayerConfig} from './data-services/data-layer-config';
import {HttpClientModule} from '@angular/common/http';
import {ReduxDataServiceConfig} from './redux-data-services/redux-data-service-config';

@NgModule({
    imports: [CommonModule,
        HttpClientModule],
    providers: [
        DataLayerService,
    ]
})
export class AngularReduxDataLayerModule {
    static forRoot(ardConfiguration: ReduxDataServiceConfig): ModuleWithProviders {
        return {
            ngModule: AngularReduxDataLayerModule,
            providers: [
                {provide: ReduxDataServiceConfig, useValue: ardConfiguration}
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: AngularReduxDataLayerModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

}
