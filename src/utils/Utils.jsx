import { useEffect } from "react"
import {useAppState} from "../AppState"

export const Countries  = () => {
    const {state, dispatch} = useAppState()
    const {url} = state
    const getCountries = async () => {
        const {token} = JSON.parse(window.localStorage.getItem("auth"))
        const response = await fetch(url + "countries/", {
            method: "get",
            headers:{
                Authorization: "bearer " + token
            }
        })
        const countries = await response.json()
        dispatch({type: "getCountries", payload: countries})
    }

    useEffect(() => {getCountries()}, [])

    return getCountries();
}