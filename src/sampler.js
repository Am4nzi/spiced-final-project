import React, { useState, useEffect } from "react";
import Tone from "tone";
import App from './app'
// import {showModal} from './app'

export default function Sampler() {
const [showModalValue, setShowModalValue] = useState(true);
  const [startMetronome, setStartMetronome] = useState(false);
  const [playButton, setPlayButton] = useState("/images/play-button.png")
  const [bpm, setBpm] = useState(375);
  const [defaultBpm, setDefaultBpm] = useState("750.5");
  const [showBpm, setShowBpm] = useState("160");
  const [distortionValue, setDistortionValue] = useState(0);
  const [reverbValue, setReverbValue] = useState(0);
  const [pitchValue, setPitchValue] = useState(0);
  const [pingPongValue, setPingPongValue] = useState(0);
  const [sample1Value, setSample1Value] = useState();
  const [timer, setTimer] = useState();

  var distortion = new Tone.Distortion(distortionValue).toMaster();

  var pingPong = new Tone.PingPongDelay({
    delayTime: pingPongValue,
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
    if (startMetronome === false) {
      setStartMetronome(true);
      setPlayButton("/images/stop.png")
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
  } else if (startMetronome === true) {
      console.log("TIMER: ", timer);
      clearTimeout(timer);
      setStartMetronome(false);
      setPlayButton("/images/play-button.png")
    }
  };

  const sample1 = e => new Tone.Sampler(
    {
       C3: "/samples/kick.wav"
    },
    function() {
      sampler.triggerAttack("C3");
    }
  ).chain(distortion, reverb, pitch, pingPong);

  //KEYPRESSES

  const keyPress = e => {
    if (e.key === "1") {
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
          C3: "/samples/snare-g.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "3") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/clap.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "4") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/tom1.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "q") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/closehihat.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "w") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/openhihat.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "e") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/crash.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "r") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/ride.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "a") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/808.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "s") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/808-d.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "d") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/808-e.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === "f") {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/808-a.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === 'z') {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/marcus-1.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === 'x') {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/marcus-2.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === 'c') {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/marcus-3.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

    if (e.key === 'v') {
      var sampler = new Tone.Sampler(
        {
          C3: "/samples/marcus-4.wav"
        },
        function() {
          sampler.triggerAttack("C3");
        }
      ).chain(distortion, reverb, pitch, pingPong);
    }

  if (e.key === "9") {
    snareLoop();
  }
};

  const onUserChange = e => {
    setBpm(parseInt(e.target.value, 10) * 4.69);
    setShowBpm(String(240 - e.target.value));
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

  const onUserChangePingPong = e => {
    setPingPongValue(parseInt(e.target.value, 10) / 10);
    console.log("pingPong value: ", parseInt(e.target.value, 10) / 10);
  };

    const playSample1 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/kick.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample2 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/snare.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample3 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/clap.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample4 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/tom1.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample5 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/closehihat.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample6 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/openhihat.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample7 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/crash.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample8 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/ride.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample9 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/808.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample10 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/808-a.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample11 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/808-d.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample12 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/808-e.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample13 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/marcus-1.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample14 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/marcus-2.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample15 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/marcus-3.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
    };

    const playSample16 = e => {
        var sampler = new Tone.Sampler(
          {
            C3: "/samples/marcus-4.wav"
          },
          function() {
            sampler.triggerAttack("C3");
          }
        ).chain(distortion, reverb, pitch, pingPong);
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
                            onClick={playSample1}
                            className={["pad1", "sampler-pad"].join(" ")}
                        ><h3>1</h3></div>
                        <div onClick={playSample2}  className={["pad2", "sampler-pad"].join(" ")}>
                            <h3>2</h3>
                        </div>
                        <div onClick={playSample3} className={["pad3", "sampler-pad"].join(" ")}>
                            <h3>3</h3>
                        </div>
                        <div onClick={playSample4} className={["pad4", "sampler-pad"].join(" ")}>
                            <h3>4</h3>
                        </div>
                        <div onClick={playSample5} onClick={playSample1} className={["pad5", "sampler-pad"].join(" ")}>
                            <h3>Q</h3>
                        </div>
                        <div onClick={playSample6} className={["pad6", "sampler-pad"].join(" ")}>
                            <h3>W</h3>
                        </div>
                        <div onClick={playSample7} onClick={playSample1} className={["pad7", "sampler-pad"].join(" ")}>
                            <h3>E</h3>
                        </div>
                        <div onClick={playSample8} className={["pad8", "sampler-pad"].join(" ")}>
                            <h3>R</h3>
                        </div>
                        <div onClick={playSample9} className={["pad9", "sampler-pad"].join(" ")}>
                            <h3>A</h3>
                        </div>
                        <div onClick={playSample10} className={["pad10", "sampler-pad"].join(" ")}>
                            <h3>S</h3>
                        </div>
                        <div onClick={playSample11} className={["pad11", "sampler-pad"].join(" ")}>
                            <h3>D</h3>
                        </div>
                        <div onClick={playSample12} className={["pad12", "sampler-pad"].join(" ")}>
                            <h3>F</h3>
                        </div>
                        <div onClick={playSample13} className={["pad13", "sampler-pad"].join(" ")}>
                            <h3>Z</h3>
                        </div>
                        <div onClick={playSample14} className={["pad14", "sampler-pad"].join(" ")}>
                            <h3>X</h3>
                        </div>
                        <div onClick={playSample15} className={["pad15", "sampler-pad"].join(" ")}>
                            <h3>C</h3>
                        </div>
                        <div onClick={playSample16} className={["pad16", "sampler-pad"].join(" ")}>
                            <h3>V</h3>
                        </div>
                    </div>

        <h3 className="bpm-label"> {showBpm}</h3>
        <h3 className="metronome-label">METRONOME</h3>
        <h3 className="set-bpm-label">SET BPM</h3>
        <h3 className="start-stop-label">START<br></br>STOP</h3>


        <div className="metronome-play-button" onClick={snareLoop}> <img
                     src={playButton}
         /></div>

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
        <h3 className="pitch-label">PITCH</h3>
        <div className="set-pitch">
          <input
            onChange={onUserChangePitch}
            type="range"
            name="points"
            min="-80"
            max="40"
          />
        </div>
        <h3 className="pingpong-label">PINGPONG DELAY</h3>
        <div className="set-pingpong">
          <input
            onChange={onUserChangePingPong}
            type="range"
            name="points"
            min="0"
            max="5"
          />
        </div>
      </div>
    </React.Fragment>
  );
}
