import {Action} from '@ngrx/store';
import {getEntityActionStrings} from './redux-data.actions.strings';
import {EntityActions} from '../redux-services/redux-data.actions.service';


export class FindAll implements Action {
    readonly type;

    constructor(public resource: string, public transactionId?: string) {
        this.type = getEntityActionStrings(resource).FIND_ALL;
    }
}

export class FindAllFailed implements Action {
    readonly type;

    constructor(public resource: string, public data: any, error: any) {
        this.type = getEntityActionStrings(resource).FIND_ALL_FAILED;
    }
}

export class FindAllSuccess implements Action {
    readonly type;

    constructor(public resource: string, public data: any[]) {
        this.type = getEntityActionStrings(resource).FIND_ALL_SUCCESS;
    }
}

export class FindRecord implements Action {
    readonly type;

    constructor(public resource: string,
                public id: string | number,
                public transactionId?: string) {
        this.type = getEntityActionStrings(resource).FIND_RECORD;
    }
}

export class FindRecordFailed implements Action {
    readonly type;

    constructor(public resource: string, public data: any) {
        this.type = getEntityActionStrings(resource).FIND_RECORD_FAILED;
    }
}

export class FindRecordSuccess implements Action {
    readonly type;

    constructor(public resource: string, public data: any) {
        this.type = getEntityActionStrings(resource).FIND_RECORD_SUCCESS;
    }
}

export class QueryAll implements Action {
    readonly type;

    constructor(public resource: string,
                public params: any,
                public transactionId?: string) {
        this.type = getEntityActionStrings(resource).QUERY_ALL;

    }
}

export class QueryAllFailed implements Action {
    readonly type;

    constructor(public resource: string, public data: any) {
        this.type = getEntityActionStrings(resource).QUERY_ALL_FAILED;
    }
}

export class QueryAllSuccess implements Action {
    readonly type;

    constructor(public resource: string, public data: any[]) {
        this.type = getEntityActionStrings(resource).QUERY_ALL_SUCCESS;
    }
}

export class Create implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any,
                public transactionId?: string) {
        this.type = getEntityActionStrings(resource).CREATE;

    }
}

export class CreateSuccess implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).CREATE_SUCCESS;
    }
}

export class CreateFailed implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).CREATE_FAIL;
    }
}

export class Update implements Action {
    readonly type;

    constructor(public resource: string,
                public id: string | number,
                public changes: Partial<any>,
                public transactionId?: string) {
        this.type = getEntityActionStrings(resource).UPDATE;

    }
}

export class UpdateSuccess implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).UPDATE_SUCCESS;

    }
}

export class UpdateFailed implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).UPDATE_FAIL;
    }
}

export class Delete implements Action {
    readonly type;

    constructor(public resource: string,
                public id: string | number,
                public transactionId?: string) {
        this.type = getEntityActionStrings(resource).DELETE;

    }
}

export class DeleteSuccess implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).DELETE_SUCCESS;
    }
}

export class DeleteFailed implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).DELETE_FAIL;
    }
}

// @TODO remove upon finalization
export class AddAll implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any[]) {
        this.type = getEntityActionStrings(resource).ADD_ALL;

    }
}

// @TODO remove upon finalization
export class AddOne implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).ADD_ONE;

    }
}

// @TODO remove upon finalization
export class Success implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).SUCCESS;
    }
}

// @TODO remove upon finalization
export class Error implements Action {
    readonly type;

    constructor(public resource: string,
                public data: any) {
        this.type = getEntityActionStrings(resource).ERROR;
    }
}

export type ReduxDataActions = Create
    | Update
    | UpdateSuccess
    | UpdateFailed

    | Delete
    | DeleteSuccess
    | DeleteFailed

    | Create
    | CreateSuccess
    | CreateFailed

    | FindAll
    | FindAllSuccess
    | FindAllFailed

    | QueryAll
    | QueryAllFailed
    | QueryAllSuccess

    | FindRecord
    | FindRecordSuccess
    | FindRecordFailed

    | AddAll
    | AddOne
    | Success
    | EntityActions;


