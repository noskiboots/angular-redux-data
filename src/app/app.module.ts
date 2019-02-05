import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularReduxDataModule} from '../../projects/angular-redux-data/src/lib/angular-redux-data.module';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule, StoreDevtoolsOptions} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {ReduxDataReducerFactory} from '../../projects/angular-redux-data/src/lib/redux-data-factories/redux-data-reducer.factory';
import {EffectsModule} from '@ngrx/effects';
import {AngularReduxDataLayerModule} from '../../projects/angular-redux-data/src/lib/angular-redux-data-layer.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AngularReduxDataModule.forRoot(environment.reduxDataServiceConfig),
        AngularReduxDataLayerModule.forRoot({
            entityNameSpaces: environment.reduxDataServiceConfig.entityNameSpaces,
            entityAdapterMappings: environment.reduxDataServiceConfig.entityAdapterMappings,
            defaultHost: environment.reduxDataServiceConfig.defaultHost,
            defaultPath: environment.reduxDataServiceConfig.defaultPath
        }),
        StoreModule.forRoot(ReduxDataReducerFactory.getReducers(
            environment.reduxDataServiceConfig.entityNameSpaces,
            environment.reduxDataServiceConfig.customReducers)
        ),
        EffectsModule.forRoot(environment.reduxDataServiceConfig.effects),
        StoreDevtoolsModule.instrument(<StoreDevtoolsOptions>{maxAge: 25}),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
