import React, {useContext} from 'react';
import {updateEditorData} from '../../actions'
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './PadEditorItem.css';

let style = { 
    background: Colors.gray, 
    color: Colors.white, 
    width: "90%", 
    textAlign: "center",
    border: `1px solid ${Colors.white}`,
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "90%",
    justifyContent: "center",
    margin: "1vh auto",
}

export default (props) => {
    const context = useContext(Context)
    return (
        <div className="pad-item-wrapper" style={style}>
            <label htmlFor={props.label} 
            className="pad-item-label pad-text" 
            style={{width: "100%", margin:"auto"}}>{props.label.toUpperCase()}: {Math.floor(props.value * 100) / 100}</label>
            <input 
            type="range" 
            min={0} 
            max={props.max} 
            value={props.value} 
            name={props.label} 
            step={props.step}
            id={props.label}
            onChange={(e) => { updateEditorData({context, cmd: props.label, val: e.target.value})}}/>
        </div>
    )
}