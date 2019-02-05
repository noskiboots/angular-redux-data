
export interface UiState {
    userId: number;
    loggedInUser: any;
    token: any;
    currentError?: string;
}

export const INITIAL_UI_STATE: UiState = {
    userId: undefined,
    loggedInUser: JSON.parse(sessionStorage.getItem('authenticated_user')),
    currentError: undefined,
    token: '9238hjlkajsdf0984ulkajsdf'
};
