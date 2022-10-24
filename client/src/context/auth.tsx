import React, {createContext, useReducer, useContext, type Dispatch} from "react";

type State = {
    user: any,
    dispatch: Dispatch<any>
}




const AuthSateContext = createContext<State | any>(null);
const AuthDispatchContext = createContext<Dispatch<any> | any>(null);

const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            user: action.payload,
        };
        case "LOGOUT":
            localStorage.removeItem('token');
        return {
            ...state,
            user: null,
        };
        default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const AuthProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});
    return (
        <AuthSateContext.Provider value={{user: state.user, dispatch}}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthSateContext.Provider>
    );
}

export const useAuthState = () => useContext(AuthSateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);






