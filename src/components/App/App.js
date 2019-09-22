import React, { useState, useContext } from "react";
import { Context } from "../../contexts/SamplerContext";
import { handlePadTrigger } from "../../actions";
import keyCTRL from "../../Config/keyboardControls";
import StartScreen from "../StartScreen/StartScreen";
import SamplerGrid from "../SamplerGrid/SamplerGrid";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const context = useContext(Context);
  const renderAppContent = () => {
    if (!context.ctx) return <StartScreen />;
    return (
      <div className="app-wrapper">
        <SamplerGrid />
      </div>
    );
  };

  const handleKeyDown = e => {
    e.preventDefault();
    e.stopPropagation();
    let keyTrigger = keyCTRL[e.which];
    if (keyTrigger && !keyTrigger.hold && !e.repeat) {
      keyCTRL[e.which].hold = true;
      handlePadTrigger(context, keyTrigger.padId);
    }
  };

  const handleKeyUp = e => {
    e.preventDefault();
    e.stopPropagation();
    let keyTrigger = keyCTRL[e.which];
    if (keyTrigger && keyTrigger.hold) {
      keyCTRL[e.which].hold = false;
    }
  };

  const showHideComponents = e => {
      if (showModal === false) {
        setShowModal(true);
      } else if (showModal === true) {
        setShowModal(false);
      }
};


  return (
    <React.Fragment>
      <div id="body-wrapper">
        <header></header>
        <div className="box"></div>
        <div onClick={showHideComponents} className ="x">
            x
        </div>

        <div className="video-wrapper">
          <iframe
            className="video"
            src="https://www.youtube.com/embed/vFNbj8KI0Rc?start=3&controls=0&showinfo=0&loop=1&modestbranding=1"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>

        {!showModal && (
          <iframe
            className="music-player"
            src="https://bandcamp.com/EmbeddedPlayer/album=3937120203/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/transparent=true/"
            seamless
          >
            <a href="http://algernoncornelius.bandcamp.com/album/in2trumentals">
              In2trumentals by Algernon Cornelius
            </a>
          </iframe>
        )}

{showModal && (
        <div
          className="mpc-wrapper"
          onKeyDown={e => {
            handleKeyDown(e);
          }}
          onKeyUp={e => {
            handleKeyUp(e);
          }}
          tabIndex="0"
        >
          {renderAppContent()}
        </div>
         )}
      </div>



    </React.Fragment>
  );
}
