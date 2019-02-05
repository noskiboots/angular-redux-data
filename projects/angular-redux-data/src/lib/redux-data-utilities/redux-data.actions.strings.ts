import * as inflection from 'inflection';

export function getEntityActionStrings(nameSpace: string) {
    const titleNamespace = inflection.classify(nameSpace);
    const CREATE = `[${titleNamespace}] Create`;
    const UPDATE = `[${titleNamespace}] Update`;
    const DELETE = `[${titleNamespace}] Delete`;

    const ADD_ALL = `[${titleNamespace}] Add All`;
    const ADD_ONE = `[${titleNamespace}] Add One`;

    const FIND_ALL = `[${titleNamespace}] Find All`;
    const FIND_ALL_FAILED = `[${titleNamespace}] Find All Failure`;
    const FIND_ALL_SUCCESS = `[${titleNamespace}] Find All Success`;
    const FIND_RECORD = `[${titleNamespace}] Find Record`;
    const FIND_RECORD_FAILED = `[${titleNamespace}] Find Record Failure`;
    const FIND_RECORD_SUCCESS = `[${titleNamespace}] Find Record Success`;
    const QUERY_ALL = `[${titleNamespace}] Query All`;
    const QUERY_ALL_FAILED = `[${titleNamespace}] Query All Failure`;
    const QUERY_ALL_SUCCESS = `[${titleNamespace}] Query All Success`;

    const UPDATE_SUCCESS = `[${titleNamespace}] Successful Update`;
    const UPDATE_FAIL = `[${titleNamespace}] Update Failed`;
    const CREATE_SUCCESS = `[${titleNamespace}] Successful Create`;
    const CREATE_FAIL = `[${titleNamespace}] Creation Failed`;
    const DELETE_SUCCESS = `[${titleNamespace}] Successful Delete`;
    const DELETE_FAIL = `[${titleNamespace}] Deletion Failed`;

    const SUCCESS = `[${titleNamespace}] Successful write`;
    const ERROR = `[${titleNamespace}]  Write Error`;
    return {
        CREATE,
        UPDATE,
        DELETE,
        ADD_ALL,
        ADD_ONE,
        FIND_ALL,
        FIND_ALL_FAILED,
        FIND_ALL_SUCCESS,
        FIND_RECORD,
        FIND_RECORD_FAILED,
        FIND_RECORD_SUCCESS,
        QUERY_ALL,
        QUERY_ALL_FAILED,
        QUERY_ALL_SUCCESS,
        UPDATE_SUCCESS,
        UPDATE_FAIL,
        CREATE_SUCCESS,
        CREATE_FAIL,
        DELETE_SUCCESS,
        DELETE_FAIL,
        SUCCESS,
        ERROR
    };
}
