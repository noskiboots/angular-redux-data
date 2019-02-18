import {Client} from '../../../../../shared/client';

export interface UiState {
    userId: number;
    loggedInUser: any;
    currentClient: Client;
    currentError?: string;
    authenticationFails?: number;
    bottomPanelDisplayed: boolean;
    ticketMasterApiKey: string;
}

export const INITIAL_UI_STATE: UiState = {
    userId: undefined,
    loggedInUser: JSON.parse(sessionStorage.getItem('authenticated_user')),
    currentClient: undefined,
    currentError: undefined,
    authenticationFails: 0,
    bottomPanelDisplayed: false,
    ticketMasterApiKey: 'OJWqORq2NZsYtVtpUl5EbNIdALoqPF2P'
};
