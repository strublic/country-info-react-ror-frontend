import React, {useReducer, createContext, useContext} from "react"

// INITIAL STATE

const initialState = {
    url: "http://localhost:3000/",
    token: null,
    username: null,
    countries: null,
    new:{
        name: "",
        capital_city: "",
        area_total: 0,
        population_size: 0,
        density: 0,
    },
    edit:{
        id: 0,
        name: "",
        capital_city: "",
        area_total: 0,
        population_size: 0,
        density: 0,
    }
}

////////////////
///REDUCER

const reducer = (state, action) => {
    let newState;
    switch(action.type){
        case "auth":
            newState = { ...state, ...action.payload };
            return newState;
        case "logout":
            newState = {...state, token: null, username: null}
            window.localStorage.removeItem("auth");
            return newState;
        case "getCountries":
            newState = {...state, countries: action.payload};
            return newState;
        case "select":
            newState = {...state, edit: action.payload};
            return newState;
        default:
            return state;
    }
}

///////
//AppContext
/////
const AppContext = createContext(null)

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
    return useContext(AppContext)
}
