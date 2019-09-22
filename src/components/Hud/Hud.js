import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import './Hud.css';
import Colors from '../../Config/ColorScheme';
import WaveformDisplay from '../WaveformDisplay/WaveformDisplay';
import Controls from '../Controls/Controls';

export default () => {
    const context = useContext(Context);
    let editToggleText = context.editMode ? '◀️' : '⚙️';
    return(
        <React.Fragment>
        <div className="hud-wrapper" style={{backgroundColor: Colors.lightblue, color: Colors.white}}>

        <a href="/">
          <p className="close-sampler">X</p>
          </a>

            <Controls editToggleText={editToggleText}/>

        </div>

        <div>

        </div>

        </React.Fragment>
    )
}
