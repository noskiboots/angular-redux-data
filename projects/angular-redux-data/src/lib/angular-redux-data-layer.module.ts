import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataLayerService} from './data-services/data-layer.service';
import {DataLayerConfig} from './data-services/data-layer-config';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [CommonModule,
        HttpClientModule],
    providers: [
        DataLayerService,
    ]
})
export class AngularReduxDataLayerModule {
    static forRoot(dataLayerConfig: DataLayerConfig): ModuleWithProviders {
        return {
            ngModule: AngularReduxDataLayerModule,
            providers: [
                {provide: DataLayerConfig, useValue: dataLayerConfig}
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
