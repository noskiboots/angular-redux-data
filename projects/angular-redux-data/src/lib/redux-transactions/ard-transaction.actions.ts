import { Action } from '@ngrx/store';
import {getEntityActionStrings} from '../redux-utilities/redux-data.actions.strings';

export const actionStrings = getEntityActionStrings('transaction');

export class FindAll implements Action {
    readonly type = actionStrings.FIND_ALL;

    constructor(public resource: string, public config?: any) {
    }
}

export class FindRecord implements Action {
    readonly type = actionStrings.FIND_RECORD;

    constructor(public resource: string,
                public id: string | number) {
    }
}

export class Create implements Action {
    readonly type = actionStrings.CREATE;

    constructor(public resource: string,
                public data: any) {
    }
}

export class Update implements Action {
    readonly type = actionStrings.UPDATE;

    constructor(public resource: string,
                public id: string | number,
                public changes: Partial<any>) {
    }
}

export class Delete implements Action {
    readonly type = actionStrings.DELETE;

    constructor(public resource: string,
                public id: string | number) {
    }
}

export class AddAll implements Action {
    readonly type = actionStrings.ADD_ALL;

    constructor(public resources: any[]) {
    }
}

export class AddOne implements Action {
    readonly type = actionStrings.ADD_ONE;

    constructor(public resource: any) {
    }
}

export class UpdateSuccess implements Action {
    readonly type = actionStrings.UPDATE_SUCCESS;

    constructor(public resource: any) {
    }
}

export class Success implements Action {
    readonly type = actionStrings.SUCCESS;

    constructor() {
    }
}
export type ArdTransactionActions
    = Create
    | Update
    | Delete
    | FindAll
    | FindRecord
    | AddAll
    | AddOne
    | Success;
