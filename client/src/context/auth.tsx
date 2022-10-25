import React, {createContext, useReducer, useContext, type Dispatch} from "react";
import jwtDecode from "jwt-decode";

type State = {
    user: any,
    dispatch: Dispatch<any>
}

let userToken: string | any;

const AuthSateContext = createContext<State | any>(null);
const AuthDispatchContext = createContext<Dispatch<any> | any>(null);

const token = localStorage.getItem('token');
if (token) {
    const decodedToken: string | any = jwtDecode(token)
    const ExpireToken = new Date( decodedToken.exp * 1000);

    if (ExpireToken < new Date()) {
        localStorage.removeItem('token');
    }else{
        userToken = decodedToken;
    }
}

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
    const [state, dispatch] = useReducer(authReducer, {user: userToken});
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






