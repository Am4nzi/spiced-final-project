import * as types from '../reducers/types'
import Colors from '../Config/ColorScheme';

export const setCTX = async (context) => {
    let ctx = !context.ctx ? new (window.AudioContext || window.webkitAudioContext)() : null;
    createAnalyser(context, ctx)
}

export const createAnalyser = (context, ctx) =>{
    let analyser = ctx.createAnalyser();
    analyser.connect(ctx.destination);
    context.dispatch({type: types.CREATE_ANALYSER, payload: {ctx, analyser}})
}

export const updateSources = (context, file) => {
    let reader = new FileReader();
    reader.onload = e => {
        context.ctx.decodeAudioData(e.target.result, (buffer) => {
            let sources = {...context.sources}
            let name = file.name.split('.')[0]
            let waveformData = buffer.getChannelData(0)
            sources[context.selectedPad] = {buffer: buffer, name, isPlaying: false, waveformData}
            let gridPadsArr = context.gridPadsArr;
            let newSource = context.ctx.createBufferSource();
            newSource.buffer = buffer;
            gridPadsArr[context.selectedPad].source = newSource;
            gridPadsArr[context.selectedPad].source.start()
            gridPadsArr[context.selectedPad].sampleEnd = buffer.duration;
            gridPadsArr[context.selectedPad].gainNode = context.ctx.createGain();
            gridPadsArr[context.selectedPad].gainNode.connect(context.ctx.destination);
            context.dispatch({type: types.UPDATE_SOURCES, payload: {sources, gridPadsArr}});
        })
    }
    reader.readAsArrayBuffer(file);
}

export const handlePadTrigger = (context, padId, velocity = 127) => {
    let selectedSource =  context.sources[padId];
    let selectedPad = padId
    if(selectedSource && selectedSource.buffer){
        if(context.gridPadsArr[padId].source && context.gridPadsArr[padId].selfMuted){
            context.gridPadsArr[padId].source.stop();
        }
        let gridPadsArr = context.gridPadsArr;
        let newSource = context.ctx.createBufferSource();
        newSource.buffer = context.sources[padId].buffer;
        gridPadsArr[padId].source = newSource;
        gridPadsArr[padId].isPlaying = true;
        if(context.selectedPad !== padId){
            context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {gridPadsArr, selectedPad}});
        }
        newSource.connect(context.gridPadsArr[padId].gainNode);
        newSource.detune.value = context.gridPadsArr[padId].detune;
        let currentGain = velocity !== 127 ? Math.pow(velocity, 2) / Math.pow(127, 2) : context.gridPadsArr[padId].currentGain;
        context.gridPadsArr[padId].gainNode.gain.setValueAtTime(currentGain, context.ctx.currentTime)
        context.gridPadsArr[padId].source.start(context.ctx.currentTime, context.gridPadsArr[padId].sampleStart , context.gridPadsArr[padId].sampleEnd);
        context.gridPadsArr[padId].source.stop(context.ctx.currentTime + context.gridPadsArr[padId].sampleEnd);
    } else {
        if(context.selectedPad !== padId){
            context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {selectedPad}});
        }
    }
}

export const handlePadStop = (context, padId, gridPadsArr) => {
    if(context.gridPadsArr[padId].source && context.gridPadsArr[padId].selfMuted){
        context.gridPadsArr[padId].source.stop();
        context.gridPadsArr[padId].isPlaying = false
        context.dispatch({type: types.HANDLE_PAD_STOP, payload: {gridPadsArr}});
    }
}

export const updateEditorData = ({context, cmd, val}) => {
    let newPadsArr = context.gridPadsArr;
    let selectedPad = context.selectedPad;
    if(cmd === "start"){
        if(val >= newPadsArr[context.selectedPad].sampleEnd) return;
        newPadsArr[context.selectedPad].sampleStart = Number(val);
    }
    if(cmd === "end"){
        if(val <= newPadsArr[context.selectedPad].sampleStart) return;
        newPadsArr[context.selectedPad].sampleEnd = Number(val);
    }
    if(cmd === "gain"){
        newPadsArr[context.selectedPad].currentGain = val;
    }
    if(cmd === "detune" && val !== "Current"){
        newPadsArr[context.selectedPad].detune = val;
    }
    if(cmd === "prev"){
        selectedPad = context.selectedPad + val < 0 ? context.gridPadsArr.length - 1 : context.selectedPad + val;
    }
    if(cmd === "next"){
        selectedPad = context.selectedPad + val > context.gridPadsArr.length - 1 ?  0 : context.selectedPad + val;
    }
    if(cmd === "play"){
        handlePadTrigger(context, context.selectedPad);
    }
    if(cmd === "stop"){
        handlePadStop(context.selectedPad, newPadsArr);
    }
    if(cmd === "color"){
        newPadsArr[context.selectedPad].color = Colors[val];
    }
    let payload = {gridPadsArr: newPadsArr, selectedPad}
    context.dispatch({type: types.UPDATE_EDITOR_DATA, payload });
}
