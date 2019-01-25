import {UiState} from './redux/features/uiState/ui-state';

export const entities = [
    'post',
    'comment'
];

export interface ApplicationState {
    uiState: UiState;
}
