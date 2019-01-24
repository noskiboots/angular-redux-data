import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RxDataActionsService} from './rx-data-services/rx-data.actions.service';
import {RxDataSelectorsService} from './rx-data-services/rx-data.selectors.service';
import {RxDataServiceConfig} from './rx-data-services/rx-data-service-config';


@NgModule({
    imports: [CommonModule],
    providers: [
        RxDataActionsService,
        RxDataSelectorsService
    ],
})
export class RxDataModule {
    static forRoot(entityConfig: RxDataServiceConfig): ModuleWithProviders {
        return {
            ngModule: RxDataModule,
            providers: [
                {provide: RxDataServiceConfig, useValue: entityConfig}
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: RxDataModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

}
