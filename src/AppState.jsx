import React, {useReducer} from "react"

// INITIAL STATE

const initialState = {
    url: "http://localhost:3000/",
    token: null,
    username: null
}

////////////////
///REDUCER

const reducer = (state, action) => {
    let newState;
    console.log(action)
    switch(action.type){
        case "auth":
            newState = { ...state, ...action.payload };
            return newState;
        case "logout":
            newState = {...state, token: null, username: null}
            window.localStorage.removeItem("auth");
            return newState;
        default:
            return state;
    }
}

///////
//AppContext
/////
const AppContext = React.createContext(null)

export const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <AppContext.Provider value={{state,dispatch}}>
        {props.children}
    </AppContext.Provider>
}

/////////
/// useAppState hook
////////
export const useAppState = () => {
    return React.useContext(AppContext)
}
