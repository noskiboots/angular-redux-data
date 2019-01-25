import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreDevtoolsModule, StoreDevtoolsOptions} from '@ngrx/store-devtools';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {ReduxDataReducerFactory} from '../../projects/angular-redux-data/src/lib/redux-data-factories/redux-data-reducer.factory';
import {entities} from './rx-data.config';
import {uiState} from './redux/features/uiState/uiStateReducer';
import {AngularReduxDataModule} from '../../projects/angular-redux-data/src/lib/angular-redux-data.module';
import {EffectsModule} from '@ngrx/effects';
import {AngularReduxDataLayerModule} from '../../projects/angular-redux-data/src/lib/angular-redux-data-layer.module';
import {CommentEffects} from './redux/effects/comment.effects';
import {PostEffects} from './redux/effects/post.effects';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot(ReduxDataReducerFactory.getReducers(entities, {uiState: uiState})),
        EffectsModule.forRoot([
            CommentEffects,
            PostEffects
        ]),
        AngularReduxDataModule.forRoot({
            entityNameSpaces: entities
        }),
        AngularReduxDataLayerModule.forRoot({
            entityNameSpaces: entities,
            entityAdapterMappings: {},
            defaultHost: environment.host,
            defaultPath: environment.path
        }),
        StoreDevtoolsModule.instrument(<StoreDevtoolsOptions>{maxAge: 25}),

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
