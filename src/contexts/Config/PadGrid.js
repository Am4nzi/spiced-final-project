import Colors from '../../Config/ColorScheme';

export default class GridPad {
    constructor({id}){
        this.id = id;
        this.isLoaded = false;
        this.name = `Pad${id}`;
        this.gainNode = null;
        this.source = null;
        this.color = Colors.purple;
        this.isPlaying = false;
        this.selfMuted = true;
        this.sampleStart = 0;
        this.currentGain = 1;
        this.detune = 0;
        this.sampleEnd = this.sampleStart;
        this.midiCC = null;
        this.midiNote = null;
    }
}