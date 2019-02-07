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
import {uiState} from './redux/features/uiState/uiStateReducer';
import {AuthenticationEffects} from './redux/effects/uiStateEffects';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AngularReduxDataModule.forRoot(environment.reduxDataServiceConfig),
        AngularReduxDataLayerModule.forRoot(environment.reduxDataServiceConfig),
        StoreModule.forRoot(ReduxDataReducerFactory.getReducers(
            environment.reduxDataServiceConfig.entityNameSpaces,
            {'uiState': uiState})
        ),
        EffectsModule.forRoot(environment.reduxDataServiceConfig.effects),
        StoreDevtoolsModule.instrument(<StoreDevtoolsOptions>{maxAge: 25}),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
