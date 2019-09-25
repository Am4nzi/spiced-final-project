import React, { useState, useEffect } from "react";
import Tone from "tone";

export default function Sampler() {
    const [startMetronome, setStartMetronome] = useState("off");
    const [bpm, setBpm] = useState(375);
    const [defaultBpm, setDefaultBpm] = useState("750.5");
    const [showBpm, setShowBpm] = useState("80");
    const [distortionValue, setDistortionValue] = useState(0);
    const [reverbValue, setReverbValue] = useState(0);
    const [pitchValue, setPitchValue] = useState(0);
    const [timer, setTimer] = useState();

    var distortion = new Tone.Distortion(distortionValue).toMaster();

    var pingPong = new Tone.PingPongDelay({
        delayTime: 0.25,
        maxDelayTime: 1
    }).toMaster();

    var reverb = new Tone.JCReverb({
        roomSize: reverbValue,
        wet: reverbValue
    }).toMaster();

    var pitch = new Tone.PitchShift({
        pitch: pitchValue,
        windowSize: 0.05,
        delayTime: 0,
        feedback: 0
    }).toMaster();

    const snareLoop = e => {
        console.log("BPM in snareLoop", bpm);
        console.log("BEFORE: ", startMetronome);
        if (startMetronome === "off") {
            setStartMetronome("on");
            console.log("AFTER: ", startMetronome);
            var sampler = new Tone.Sampler(
                {
                    C3: "/samples/snare.wav"
                },
                function timeout() {
                    console.log("TIMER: ", timer);
                    setTimer(
                        setTimeout(function() {
                            sampler.triggerAttack("C3");
                            timeout();
                        }, bpm)
                    );
                }
            ).toMaster();
        } else if (startMetronome === "on") {
            console.log("TIMER: ", timer);
            clearTimeout(timer);
            setStartMetronome("off");
        }
    };

    //KEYPRESSES

    const keyPress = e => {
        if (e.key === "1") {
            console.log("BPM", bpm);
            var sampler = new Tone.Sampler(
                {
                    C3: "/samples/kick.wav"
                },
                function() {
                    sampler.triggerAttack("C3");
                }
            ).chain(distortion, reverb, pitch, pingPong);
        }

        if (e.key === "2") {
            console.log(reverbValue);
            var sampler = new Tone.Sampler(
                {
                    C3: "/samples/clap.wav"
                },
                function() {
                    sampler.triggerAttack("C3");
                }
            ).chain(distortion, reverb, pitch);
        }

        if (e.key === "3") {
            var sampler = new Tone.Sampler(
                {
                    C3: "/samples/snare.wav"
                },
                function() {
                    sampler.triggerAttack("C3");
                }
            ).chain(distortion, reverb, pitch);
        }

        if (e.key === "4") {
            var sampler = new Tone.Sampler(
                {
                    C3: "/samples/808.wav"
                },
                function() {
                    sampler.triggerAttack("C3");
                }
            ).chain(distortion, reverb, pitch);
        }

        if (e.key === "9") {
            snareLoop();
        }
    };

    const onUserChange = e => {
        setBpm(parseInt(e.target.value, 10) * 5);
        setShowBpm(String(e.target.value));
        console.log("HI", e.target.value);

        console.log(parseInt(e.target.value, 10) * 4.69);
    };

    const onUserChangeDistortion = e => {
        setDistortionValue(parseInt(e.target.value, 10) / 10);
        console.log("DISTORTION: ", parseInt(e.target.value, 10) / 10);
    };

    const onUserChangeReverb = e => {
        setReverbValue(parseInt(e.target.value, 10) / 10);
        console.log("REVERB: ", parseInt(e.target.value, 10) / 10);
    };

    const onUserChangePitch = e => {
        setPitchValue(parseInt(e.target.value, 10));
        console.log("pitchValue: ", parseInt(e.target.value, 10));
    };

    useEffect(() => {
        console.log("useEffect is running");
        console.log("bpm in useeffect", bpm);
    }, []);

    useEffect(() => {
        document.onkeydown = keyPress;
    });

    return (
        <React.Fragment>
            <div className="sampler-modal">
                <h1>SAMPLER</h1>
                <div className="pad-container">
                    <div
                        onClick={snareLoop}
                        className={["pad1", "sampler-pad"].join(" ")}
                    ></div>
                    <div className={["pad2", "sampler-pad"].join(" ")}></div>
                    <div className={["pad3", "sampler-pad"].join(" ")}></div>
                    <div className={["pad4", "sampler-pad"].join(" ")}></div>
                    <div className={["pad5", "sampler-pad"].join(" ")}></div>
                    <div className={["pad6", "sampler-pad"].join(" ")}></div>
                    <div className={["pad7", "sampler-pad"].join(" ")}></div>
                    <div className={["pad8", "sampler-pad"].join(" ")}></div>
                    <div className={["pad9", "sampler-pad"].join(" ")}></div>
                    <div className={["pad10", "sampler-pad"].join(" ")}></div>
                    <div className={["pad11", "sampler-pad"].join(" ")}></div>
                    <div className={["pad12", "sampler-pad"].join(" ")}></div>
                    <div className={["pad13", "sampler-pad"].join(" ")}></div>
                    <div className={["pad14", "sampler-pad"].join(" ")}></div>
                    <div className={["pad15", "sampler-pad"].join(" ")}></div>
                    <div className={["pad16", "sampler-pad"].join(" ")}></div>
                </div>

                <h3 className="bpm-label"> {showBpm}</h3>

                <div
                    className="metronome-play-button"
                    onClick={snareLoop}
                ></div>
                <div className="set-bpm">
                    <input
                        onChange={onUserChange}
                        type="range"
                        name="points"
                        min="80"
                        max="160"
                    />
                </div>
                <h3 className="distortion-label">DISTORTION</h3>
                <div className="set-distortion">
                    <input
                        onChange={onUserChangeDistortion}
                        type="range"
                        name="points"
                        min="0"
                        max="10"
                    />
                </div>
                <h3 className="reverb-label">REVERB</h3>
                <div className="set-reverb">
                    <input
                        onChange={onUserChangeReverb}
                        type="range"
                        name="points"
                        min="0"
                        max="5"
                    />
                </div>
                <h3 className="eqmid-label">PITCH</h3>
                <div className="set-eqmid">
                    <input
                        onChange={onUserChangePitch}
                        type="range"
                        name="points"
                        min="-200"
                        max="40"
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
