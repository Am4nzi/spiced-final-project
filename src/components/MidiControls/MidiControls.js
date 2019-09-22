import React, {useContext, useEffect} from 'react';
import {SET_MIDI_INPUTS} from '../../reducers/types'; 
import {updateEditorData, handlePadTrigger} from '../../actions'
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import '../Controls/Controls.css';
import midiMap from '../../Config/midiMap';

export default (props) => {
    let context = useContext(Context);
    const renderSelectOptions = () => {
        if(!context.midiInputs) return 
        else return context.midiInputs.map(input => {
            return <option key={input.id} id={input.id}>{input.name}</option>
        })
    }
    const renderMidiDeviceSelector = () => {
        if(!context.midiInputs) return <span className="disable-text-select" role="img" aria-label="no midi">🚫🎹</span>
        return(
            <select className="ctl-select" style={{color: Colors.white}}>
                {renderSelectOptions()}
            </select>
        )
    }
    const addMidiListeners = () => {
        context.midiInputs.forEach(input => {
            input.onmidimessage = (e) => {
                // console.log(e);
                let cmd = e.data[0];
                let note = e.data[1];
                let velocity = e.data[2];
                if(!midiMap[note]) return
                if(midiMap[note].cc === "note" && cmd - context.midiChannel === 144){
                    handlePadTrigger(context, midiMap[note].padId, velocity)
                }
                if(midiMap[note].cc === "gain"){
                    let gain = Math.pow(velocity, 2) / Math.pow(127, 2);
                    updateEditorData({context, cmd: "gain", val: gain});
                }
                if(midiMap[note].cc === "detune"){
                    let detune = Math.round(Math.pow(velocity, 2) / Math.pow(127, 2) * Math.pow(10, 3));
                    updateEditorData({context, cmd: "detune", val: detune});
                }
                if(midiMap[note].cc === "sampleStart"){
                    let sourceAvailable = context.gridPadsArr[context.selectedPad].source
                    if(!sourceAvailable || !sourceAvailable.buffer) return
                    let start = Math.pow(velocity, 2) / Math.pow(127, 2) * sourceAvailable.buffer.duration
                    updateEditorData({context, cmd: "start", val: start});
                }
                if(midiMap[note].cc === "sampleEnd"){
                    let sourceAvailable = context.gridPadsArr[context.selectedPad].source
                    if(!sourceAvailable || !sourceAvailable.buffer) return
                    let end = Math.pow(velocity, 2) / Math.pow(127, 2) * sourceAvailable.buffer.duration
                    updateEditorData({context, cmd: "end", val: end});
                }
            }
        });
    }
    const setMidiInputs = (midiInputs) => {
        context.dispatch({type: SET_MIDI_INPUTS, payload: {midiInputs}})
    }
    const getMidiDevices = () => {
        navigator.requestMIDIAccess()
        .then((access) => {
            let inputs = access.inputs.entries().next().value;
            // let outputs = access.outputs;
            access.onstatechange = (e) => {
                console.log(e.port.name, e.port.manufacturer, e.port.state);
            } 
            let filteredInputs = inputs.filter(input => typeof(input) === "object")
            setMidiInputs(filteredInputs);
        })
        .catch(err => {
            setMidiInputs(null);
        })
    }

    useEffect(() => {
        if(context.midiEnabled || !context.midiInputs) getMidiDevices();
        if(!context.midiInputs) return
            
    }, []);
    if(context.midiInputs) addMidiListeners()
    return (
        <div className="ctl-select-wrapper">
            {renderMidiDeviceSelector()}
        </div>
    )
}