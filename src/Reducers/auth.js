const initialState = {
    loading: false,
    user: null,
    error: null,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
        case 'LOGOUT_REQUEST':
            return { ...state, loading: true };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return { ...state, loading: false, user: action.payload };
        case 'LOGIN_ERROR':
        case 'REGISTER_ERROR':
        case 'LOGOUT_ERROR':
            return { ...state, loading: false, error: action.error };
        case 'LOGOUT_SUCCESS':
            return { ...state, loading: false, user: null };
        case 'AUTH_IS_LOADED':
            return {...state, user: auth.currentUser}
        default:
            return state;
    }
}