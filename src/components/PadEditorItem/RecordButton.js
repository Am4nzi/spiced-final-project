import React, {useContext} from 'react';
import {TOGGLE_IS_RECORDING} from '../../reducers/types';
import {Context} from '../../contexts/SamplerContext';
import {updateSources} from '../../actions'
import Colors from '../../Config/ColorScheme';
import './PadEditorButtons.css';

let recorder = null;
let recordedChunks = [];
let style = { 
    background: Colors.gray, 
    color: Colors.red, 
    width: "90%", 
    textAlign: "center",
    border: `1px solid ${Colors.white}`,
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    margin: "1vh auto"
}

export default () => {
    const context = useContext(Context);
    const toggleIsRecording = (monitor) => {
        let isRecording = !context.isRecording
        context.dispatch({type: TOGGLE_IS_RECORDING, payload: { isRecording, monitor }});
    }
    
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then(stream => {
                let monitorStream = stream.clone()
                let monSource = context.ctx.createMediaStreamSource(monitorStream);
                monSource.connect(context.ctx.destination);
                let recSource = context.ctx.createMediaStreamSource(stream);
                let recDestination = context.ctx.createMediaStreamDestination();
                recSource.connect(recDestination);
                recorder = new MediaRecorder(recDestination.stream);
                recorder.start()
                recorder.onstop = () => {
                    let recordedBlob = new Blob(recordedChunks, { 'type' : 'audio/ogg; codecs=opus' });
                    recordedBlob.name = "sample record";
                    recordedChunks = [];
                    recorder = null;
                    updateSources(context, recordedBlob)
                    let monitorTracks = monitorStream.getAudioTracks();
                    monitorTracks.forEach(track => track.stop());
                    let recTracks = stream.getAudioTracks();
                    recTracks.forEach(track => track.stop());
                }
                recorder.ondataavailable  = (e) => {
                    recordedChunks.push(e.data);
                }
                toggleIsRecording(monSource);
            })
            .catch(err => console.log(err))
    }
    const stopRecording = () => {
        recorder.stop();
        context.monitor.disconnect();
        toggleIsRecording(null);
    }
    const renderButtonContent = () => {
        if(!context.isRecording){
            return <button className="editor-btn btn-play" id="rec" onClick={(e) => { startRecording() }}>REC</button>
        }
        return (
            <button 
            style={{backgroundColor: Colors.red }} 
            className="editor-btn btn-play" 
            id="rec" 
            onClick={(e) => { stopRecording() }}
            >
            STOP
            </button>
        )
    }
    return (
        <div className="pad-item-wrapper" style={style}>
            {renderButtonContent()}
        </div>
    )
}