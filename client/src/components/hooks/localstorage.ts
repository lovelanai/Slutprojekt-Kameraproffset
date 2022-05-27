import {useEffect, useState} from "react";

export function useLocalStorageState<S>(defaultState: S, key: string) {
    const preparedState = localStorage[key] ? JSON.parse(localStorage[key]) as S : defaultState
    const [state, setState] = useState(preparedState)

    //saves the state to localstorage
    useEffect(() => {
        localStorage[key] = JSON.stringify(state)
    }, [state, key])

    //as const för att vara mer specifik
    return[state, setState] as const
}