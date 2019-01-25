import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {DataLayerConfig} from './data-layer-config';
import {ApplicationHttpAdapter} from '../data-adapters/application-http-adapter';

@Injectable()
export class DataLayerService {
    public adapters = {};

    constructor(@Optional() dataLayerConfig: DataLayerConfig,
                protected _http: HttpClient,
                private _store: Store<any>) {
        dataLayerConfig.entityNameSpaces.forEach(entity => {
            const customerAdapter = dataLayerConfig.entityAdapterMappings[entity];
            if (!!customerAdapter) {
                this.adapters[entity] = new customerAdapter.adapter(
                    _http,
                    dataLayerConfig.entityAdapterMappings[entity].host,
                    dataLayerConfig.entityAdapterMappings[entity].path,
                    _store,
                    dataLayerConfig.entityAdapterMappings[entity].config
                );
            } else {
                this.adapters[entity] = new ApplicationHttpAdapter(
                    _http,
                    dataLayerConfig.defaultHost,
                    dataLayerConfig.defaultPath,
                    _store
                );
            }
        });
    }
}
