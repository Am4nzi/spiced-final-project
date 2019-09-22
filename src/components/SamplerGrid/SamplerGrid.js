import React, {useContext, useEffect} from 'react';
import {Context} from '../../contexts/SamplerContext';
import * as types from '../../reducers/types';
import GridPad from '../../contexts/Config/PadGrid';
import Colors from '../../Config/ColorScheme';
import Hud from '../Hud/Hud';
import PadEditor from '../PadEditor/PadEditor';
import Pad from '../Pad/Pad';
import midiMap from '../../Config/midiMap';
import './SamplerGrid.css';

const SamplerGrid = () => {
    const context = useContext(Context);
    const gridArr = context.gridPadsArr;
    const renderPad = (item) => {
        let backgroundColor = Colors.black
        let source = context.sources[item.id];
        const midiNote = midiMap[item.id + 36].note;
        if(!context.editMode && source && source.buffer) backgroundColor = context.gridPadsArr[context.selectedPad].color;
        if(context.editMode && source && source.buffer) backgroundColor = Colors.green;
        return <Pad
        midiNote={midiNote}
        key={item.id}
        id={item.id}
        name={item.name}
        backgroundColor={backgroundColor}
        />
    }
    const rendercontent = () => {
        if(!context.editMode) return <div>{gridArr.map((item) => { return renderPad(item) })}</div>
        return <PadEditor />
    }
    const testForTouchDevice = () => {
        return 'ontouchstart' in window;
    }
    const testForMidiAPI = () => {
        return "requestMIDIAccess" in navigator;
    }
    const generateGrid = () => {
        let midiEnabled = testForMidiAPI();
        let touchEnabled = testForTouchDevice();
        let gridPadsArr = [];
        for(let i = 0; i < context.numPads; i++){
            let newPad = new GridPad({id: i})
            gridPadsArr.push(newPad)
        }
        let payload = {gridPadsArr, touchEnabled, midiEnabled}
        context.dispatch({ type: types.GENERATE_GRID, payload })
    }
    useEffect(() => {
        if(context.gridPadsArr.length < 1) generateGrid();
    }, []);
    return (
        <div
        className="grid-wrapper"

        >
        <Hud />
            <div className="grid">
                {rendercontent()}
            </div>
        </div>
    )
}

export default SamplerGrid
