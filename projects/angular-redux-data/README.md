# Angular Redux Data

This project is intended to provide an complete data layer framework for Angular 7+ applications. Angular Redux Data (ARD)
utilizes [@ngrx](https://github.com/ngrx/platform) and relative libraries to provide redux state management without the developer needing to create excessive
and redundant boilerplate code for a standard data schema. The framework also provides a standard DataLayerService to be used
with HTTP RESTful and Websocket based apis.

**_NOTE_** developers using this library will benefit from having a fundamental understanding of [REDUX and @ngrx](https://ngrx.io/).
However, this knowledge is not required if the application will only be using ARD as a standardized data layer solution.

## Project Status

~~Initialized~~ -> **Under Construction** -> Alpha -> Beta -> Production

## Getting Started

The following setup steps are to configure an Angular 7+ application to access data from the [JSONplaceholder](https://jsonplaceholder.typicode.com/)
public api.

####Installation

---
In order to use the ARD framework your angular application must be versioned `^7.1.0`.
Simply install the framework as:

`npm install --save angular-redux-data`

####Setup

ARD aims to minimize if not eliminate all of the code overhead that typically comes with Redux based state manage and 
creating extensive data layer services in Angular application. Large applications can have tens to hundreds of models in
their schema which can make Redux and Angular data layers very difficult to maintain and test.

Inspired by [ember-data's](https://github.com/emberjs/data) use of patterns and naming conventions and adapters ARD needs
only a few configuration steps to provide you with UI layer access to all your schema's data.

#####Configuration

######environment variables

In your project's `environment.ts` file define the following items

| Key           | Example Value                 | Description  |
| ------------- |:-------------:                |        -----|
| `entities`    | `['post', 'comment']`         | **array of strings**; each on the singularization of the corresponding schema's entity
| `host`        | `'http://localhost:3000'`     | **string**; the host location of the api you are retrieving data from
| `path`        |`'api/v1'`                     | **string**; the path within the api (i.e. version) your data will be accessing. This can be an empty string.

Full Example: 
```typescript
export const environment = {
  production: false,
  defaultHost: 'https://jsonplaceholder.typicode.com',
  defaultPath: ''
};
```

######app.module

Import `StoreModule` and call the `ReduxDataReducerFactory.getReducers(entities, customReducers)`

```
StoreModule.forRoot(ReduxDataReducerFactory.getReducers(entities, {uiState: uiState})),
```

**`getReducers()` parameters**

_entities_: this is the string list of entity names from your environment configuration

_customerReducers_: This is a set of key value pairs for custom reducer declarations for redux reducers
that fall outside the scope of this framework. For example, if you have a UIState feature to handle the
state of various components throughout your application pass it hear and it will be included in the Redux store.
see more at  <https://ngrx.io/guide/store>

---

Import `AngularReduxDataModule`

```typescript
AngularReduxDataModule.forRoot({
    entityNameSpaces: environment.entities // from environment.ts
})
```

Import `AngularReduxDataLayerModule` and pass the following ite

```typescript
AngularReduxDataLayerModule.forRoot({
            entityNameSpaces: environment.entities, // from environment.ts
            entityAdapterMappings: {}, // See following section Customer Entity Adapters
            defaultHost: environment.defaultHost, // from environment.ts
            defaultPath: environment.defaultPath // from environment.ts
        }),
```

######entity effects
 

In order retrieve data from your api endpoint(s) you will need to setup a  [@ngrx/effects](https://ngrx.io/guide/effects) service for
every model in your schema. 

ARD streamlines the data layer interaction for ngrx/effects in Angular application via the `DataLayerService` that is configured in the 
`app.module` component. 

In each Effects service that you want to utilize the data layer adaptor follow these steps:

1. Implement the `RxDataEffectI` interface to contract the following properties:

    ```typescript
    @Effect() findAll$;
    @Effect() findRecord$;
    @Effect() create$;
    @Effect() delete$;
    @Effect() update$;
    @Effect() queryAll$;
    ```

2. Inject the following ARD and REDUX services into your services constructor:

    ```typescript
    Actions // import {Actions, Effect} from '@ngrx/effects';
    ReduxDataActionsService // import {ReduxDataActionsService, RxDataEffectI} from 'angular-redux-data';
    DataLayerService // import {DataLayerService} from 'angular-redux-data/lib/data-services/data-layer.service';
    ```

3. In the constructor assign the RxDataEffectI properties as follows :
    
    ```typescript
    this.findAll$ = this.actionsService.findAllResource$(actions$, _dataLayerService, '<singularization of model namespace>');
    this.findRecord$ = this.actionsService.findRecordResource$(actions$, _dataLayerService, '<singularization of model namespace>');
    this.queryAll$ = this.actionsService.queryAllResource$(actions$, _dataLayerService, '<singularization of model namespace>');
    this.create$ = this.actionsService.createResource$(actions$, _dataLayerService, '<singularization of model namespace>');
    this.delete$ = this.actionsService.deleteResource$(actions$, _dataLayerService, '<singularization of model namespace>');
    this.update$ = this.actionsService.updateResource$(actions$, _dataLayerService, '<singularization of model namespace>');
    ```

* **_Note_**: This implementation will likely change in a future version to further reduce the redux boilerplate. This setup has been left
manual for now in order to provide flexibility in regards to the side effects needed for each model in the schema.

#####Use

In your component inject the ReduxDataActionsService and ReduxDataSelectorsService and the [@ngrx/store](https://github.com/ngrx/platform) StoreModule 
```typescript
constructor(private _actionsService: ReduxDataActionsService,
                private _entitySelectorsService: ReduxDataSelectorsService,
                private _store: Store<ApplicationState>) {
    }
```

The usage of ARD is similar to the typical redux patterns implemented in [@ngrx](https://github.com/ngrx/platform) and [@ngrx/entity](https://ngrx.io/guide/entity).
However, the actions and selectors for typical data layer use cases are automatically available for each entity name via the ReduxData services injected.
A typical use case to find a post with an id = 1 and all of it relative comments
```typescript
ngOnInit() {
   this._store.dispatch(new this._actionsService.actions['post'].FindRecord('posts', 1));
           this._store.pipe(
               select(this._entitySelectorsService.getSelector('post').selectById(1)),
               filter(item => !!item))
               .subscribe(post$ => {
                   this._store.dispatch(new this._actionsService.actions['comment'].QueryAll('comments', {'postId': post$.id}));
                   this._store.pipe(
                       select(this._entitySelectorsService.getSelector('comment').selectAll()),
                       filter(items => !!items && items.length > 0))
                       .subscribe((comments$) => {
                           post$['comments'] = comments$;
                           this.post = post$ as Post;
                       });
               }); 
}
```

Actions

`this._actionsService.actions[<entity name string>].` :

|       method      | Code Sample   | Description   |
| -------------     | --------      |    --------   | 
|      FindRecord   |   | |
|      FindAll      |   | |
|      QueryAll     |   | |
|      Create       |   | |
|      Update       |   | |
|      Delete       |   | |

Selections

`this._store.pipe(select(this._entitySelectorsService.getSelector('post').<method>),...)`

|       method            | Description  |
| -------------           |           -----|
|      selectById         | 
|      selectAll          |
|      selectEntities     | 
|      selectIds          | 
|      selectTotal        | 




---
###END BASIC SETUP AND IMPLEMENTATION

---

##Advanced Configuration

###Custom Entity Adapters

####Extending the DataAdapter class

####Defining your adpater mappings
