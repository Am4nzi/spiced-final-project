import React, {useReducer} from 'react';
import updateEditorReducer from '../reducers/samplerReducer';
import INITIAL_STATE from './Config/AudioInitialState';

export const Context = React.createContext();

export function SamplerContextStore(props) {
    const [state, dispatch] = useReducer(updateEditorReducer, INITIAL_STATE)
    return <Context.Provider value={{
        ...state,
        dispatch,
    }}>{props.children}
    </Context.Provider>
}