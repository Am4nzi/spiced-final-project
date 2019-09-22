import React, {useContext} from 'react';
import {TOGGLE_REC_MODE, CLEAR_SELECTED_PAD, TOGGLE_EDIT_MODE} from '../../reducers/types';
import {updateSources} from '../../actions'
import './Controls.css';
import {Context} from '../../contexts/SamplerContext';
import MidiControls from '../MidiControls/MidiControls';

const Controls = (props) => {
    const context = useContext(Context);
    let currentPad = context.gridPadsArr[context.selectedPad];
    const validateSelectedFile = (file) => {
        if(!file) return console.log("No file...")
        let ext = file.name.split('.')[1]
        let validExt = /mp3|wav|m4a/.test(ext)
        if(!validExt) return console.error("Unable to load selected file")
        return updateSources(context, file)
    }
    const toggleRecMode = () => {
        let recMode = !context.recMode
        context.dispatch({type: TOGGLE_REC_MODE, payload: {recMode}})
    }
    const toggleEditMode = () => {
        let editMode = !context.editMode;
        let recMode = false;
        context.dispatch({type: TOGGLE_EDIT_MODE, payload: {editMode, recMode} });
    }
    const clearSelectedPad = () => {
        let sources = {...context.sources}
        sources[context.selectedPad] = {buffer: null, name: "", isPlaying: false}
        let gridPadsArr = [...context.gridPadsArr];
        gridPadsArr[context.selectedPad].source = null
        context.dispatch({type: CLEAR_SELECTED_PAD, payload: {sources, gridPadsArr}})
    }
    const renderRecButton = () => {
        if(context.editMode && currentPad && !currentPad.source){
            if(!context.recMode){
                return(
                    <div className="file-selector-wrapper">
                        <button
                        onClick={() => { toggleRecMode() }}
                        className="ctl-btn"
                        >REC</button>
                    </div>
                )
            } else {
                return(
                    <div className="file-selector-wrapper">
                        <button
                        onClick={() => { toggleRecMode() }}
                        className="ctl-btn"
                        >EDIT</button>
                    </div>
                )
            }
            
        }
    }
    const renderFileUpload = () => {
        const openFileSelector = (e) => {
            e.preventDefault();
            let fileSelector = document.getElementById("fileSelector");
            fileSelector.click();
        }
        return (
            <div className="file-selector-wrapper">
                <button 
                className="ctl-btn" 
                onClick={(e) => openFileSelector(e)}>LOAD</button>
                <input 
                type="file" 
                style={{display:"none"}}
                id="fileSelector"
                onChange={(e) => validateSelectedFile(e.target.files[0])} 
                accept="audio/*" multiple={false}/>
            </div>    
        )
    }
    const renderSourceLoadUnload = () => {
        if(context.editMode && currentPad && !currentPad.source) return renderFileUpload();
        if(context.editMode && currentPad && currentPad.source) {
            return <button className="ctl-btn" onClick={() => clearSelectedPad()}>UNLOAD</button>
        }
        if(context.editMode && currentPad && !currentPad.source) return renderFileUpload()
    }
    const renderMidiControls = () => {
        if(!context.midiEnabled) return
        return <MidiControls />
    }
    
    return (
        <div className="controls-wrapper">
            <button 
            className="ctl-btn" 
            onClick={() => toggleEditMode()}>{props.editToggleText}</button>
            {renderSourceLoadUnload()}
            {renderRecButton()}
            {renderMidiControls()}
        </div>
    )
}

export default Controls