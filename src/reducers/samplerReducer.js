import * as types from './types'


export default (state, {type, payload}) => {
    switch(type){
        case types.UPDATE_EDITOR_DATA:
            return {...state, ...payload}
        case types.CLEAR_SELECTED_PAD:
            return {...state, ...payload}
        case types.HANDLE_PAD_STOP:
            return {...state, ...payload}
        case types.UPDATE_SOURCES:
            return {...state, ...payload}
        case types.HANDLE_PAD_TRIGGER:
            return {...state, ...payload}
        case types.TOGGLE_EDIT_MODE: 
            return {...state, ...payload}
        case types.TOGGLE_IS_RECORDING:
            return {...state, ...payload}
        case types.TOGGLE_DIRECT_MONITOR:
            return {...state, ...payload}
        case types.GENERATE_GRID:
            return {...state, ...payload}
        case types.SET_MIDI_INPUTS:
            return {...state, ...payload}
        case types.CREATE_ANALYSER:
            return {...state, ...payload}
        default:
            return state
    }
}