import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './PadEditorButtons.css';
import {TOGGLE_DIRECT_MONITOR} from '../../reducers/types';
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
    const renderButtonContent = () => {
        let content = context.isMonitoring ? "MUTE" : "MON";
        return content;
    }
    const toggleDirectMonitor = () => {
        if(!context.monitor) return;
        let isMonitoring = !context.isMonitoring
        if(isMonitoring){
            context.monitor.connect(context.ctx.destination);
        } else {
            context.monitor.disconnect();
        }
        context.dispatch({type: TOGGLE_DIRECT_MONITOR, payload: {isMonitoring}});
    }    
    return (
        <div className="pad-item-wrapper" style={style}>
            <button className="editor-btn" id="monitor" onClick={(e) => { toggleDirectMonitor()}}>
                {renderButtonContent()}
            </button>
        </div>
    )
}