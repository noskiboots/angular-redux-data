import {UiState} from './redux/features/uiState/ui-state';

export const entities = [
    'post',
    'comment',
    'client'
];

export interface ApplicationState {
    uiState: UiState;
}
