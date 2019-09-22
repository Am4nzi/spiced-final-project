import React, {useContext} from 'react';
import {updateEditorData} from '../../actions'
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './PadEditorButtons.css';


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

export default ({cmd, content}) => {
    const context = useContext(Context)
    return (
        <div className="pad-item-wrapper" style={style}>
            <button
            className="editor-btn btn-play"
            id="next"
            onClick={(e) => { updateEditorData({context, cmd: cmd})}}
            >
            {content}
            </button>
        </div>
    )
}