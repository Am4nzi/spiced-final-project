import React, {useContext, useRef, useEffect} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';

export default () => {
    const context = useContext(Context);
    const canvasRef = useRef(null)
    const draw = () => {
        let canvas = canvasRef.current;
        let c = canvas.getContext('2d');
        c.clearRect(0, 0, canvas.width, canvas.height);
        let sourceAvailable = context.sources[context.selectedPad];
        if(!sourceAvailable || !sourceAvailable.waveformData) return;
        let data = sourceAvailable.waveformData;
        let step = Math.ceil(data.length / canvas.width);
        let amp = canvas.height / 2;
        c.fillStyle = Colors.white;
        for(var i=0; i < canvas.width; i++){
            var min = 1.0;
            var max = -1.0;
            for (var j=0; j<step; j++) {
                var datum = data[(i*step)+j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }
            c.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
        }
    }
    useEffect(() => {
            draw()
    })
    let selectedSource = context.sources[context.selectedPad] ? context.sources[context.selectedPad] : 'Empty'
    let backgroundColor = context.isRecording ? Colors.red : Colors.blue;
    return <div>
            <canvas
            id="waveformDisplay"
            ref={canvasRef}
            style={{backgroundColor: backgroundColor, width: "100%", height: "9vh", position: "absolute", left: 0}}
            />
            <h4 draggable={false} style={{position: "relative", top: 0, margin: "1vh 0vw"}} className="pad-name disable-text-select">{context.selectedPad + 1} : {selectedSource.name}</h4>
        </div>
}
