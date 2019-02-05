class AdapterMap {
    adapter: any;
    config: any;
    host: string;
    path: string;
}

export class ReduxDataServiceConfig {
    entityNameSpaces: string[];
    entityAdapterMappings: any;
    defaultHost: string;
    defaultPath: string;
    customReducers: any;
    effects: any[];
}
