import {Action} from '@ngrx/store';
import {getEntityActionStrings} from './redux-data.actions.strings';
import {EntityActions} from '../redux-data-services/redux-data.actions.service';


export class FindAll implements Action {
    readonly type;

    constructor(public resource: string, public config?: any) {
        this.type = getEntityActionStrings(resource).FIND_ALL;
    }
}

export class FindRecord implements Action {
    readonly type;

    constructor(public resource: string,
                public id: string | number) {
        this.type = getEntityActionStrings(resource).FIND_RECORD;
    }
}

export class QueryAll implements Action {
    readonly type;

    constructor(public resource: string,
                public params: any) {
        this.type = getEntityActionStrings(resource).QUERY_ALL;

    }
}

export class Create implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).CREATE;

    }
}

export class Update implements Action {
    readonly type;

    constructor(public resource: string,
                public id: string | number,
                public changes: Partial<any>) {
        this.type = getEntityActionStrings(resource).UPDATE;

    }
}

export class Delete implements Action {
    readonly type;

    constructor(public resource: string,
                public id: string | number) {
        this.type = getEntityActionStrings(resource).DELETE;

    }
}

export class AddAll implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any[]) {
        this.type = getEntityActionStrings(resource).ADD_ALL;

    }
}

export class AddOne implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).ADD_ONE;

    }
}

export class UpdateSuccess implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).UPDATE_SUCCESS;

    }
}

export class UpdateFail implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).UPDATE_FAIL;
    }
}

export class CreateSuccess implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).CREATE_SUCCESS;
    }
}

export class CreateFail implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).CREATE_FAIL;
    }
}

export class DeleteSuccess implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).DELETE_SUCCESS;
    }
}

export class DeleteFail implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).DELETE_FAIL;
    }
}


export class Success implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).SUCCESS;
    }
}

export class Error implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).ERROR;
    }
}

export type ReduxDataActions = Create
    | Update
    | Delete
    | FindAll
    | FindRecord
    | AddAll
    | AddOne
    | Success
    | EntityActions;


