import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import EditorItemRange from '../PadEditorItem/EditorItemRange';
import EditorItemButtons from '../PadEditorItem/EditorItemButtons';
import EditorItemButton from '../PadEditorItem/EditorItemButton';
import RecordButton from '../PadEditorItem/RecordButton';
import MonitorButton from '../PadEditorItem/MonitorButton';
import ColorSelector from '../ColorSelector/ColorSelector';

import './PadEditor.css';

export default () => {
    const context = useContext(Context);
    let selectedPad = context.gridPadsArr[context.selectedPad];
    let max = 0;
    let source = context.gridPadsArr[context.selectedPad].source;
    if(source && source.buffer ){
        max = source.buffer.duration;
    }
    if(context.recMode){
        return (
            <div className="editor-wrapper">
                <EditorItemButtons cmd1="prev" cmd2="next" content1="◄" content2="►" val1={-1} val2={1} />
                <EditorItemButton cmd="play" content="►" />
                <RecordButton />
                <MonitorButton />
            </div>
        )
    } else {
        return(
            <div className="editor-wrapper">
                <EditorItemButtons cmd1="prev" cmd2="next" content1="◄" content2="►" val1={-1} val2={1} />
                <EditorItemButton cmd="play" content="►" />
                <EditorItemRange label="start" value={selectedPad.sampleStart} max={max} step={0.001} />
                <EditorItemRange label="end" value={selectedPad.sampleEnd} max={max} step={0.001} />
                <EditorItemRange label="gain" value={context.gridPadsArr[context.selectedPad].currentGain} max={1} step={0.01} />
                <EditorItemRange label="detune" value={context.gridPadsArr[context.selectedPad].detune} step={25} min={0} max={1000} />
                <ColorSelector />
                <EditorItemRange label="placeholder3" value={0} />
            </div>
        )
    }
}

