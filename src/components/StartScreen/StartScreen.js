import React, { useContext } from "react";
import { Context } from "../../contexts/SamplerContext";
import { setCTX } from "../../actions";
import "./StartScreen.css";
import Colors from "../../Config/ColorScheme";
import WorkerNotify from "../WorkerNotify/WorkerNotify";

export default () => {
  const context = useContext(Context);
  const displayContent = () => {
    if (!window.AudioContext) {
      return (
        <div>
          <div className="start-info">
            <p>Sorry, Your browser doesn't support Web Audio :(</p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <button
          className="btn"
          onClick={() => {
            setCTX(context);
          }}
        >
          START
        </button>
      </div>
    );
  };
  const renderInstallButton = () => {
    if (!window.matchMedia('("display-mode: standalone")').matches) {
      return <WorkerNotify />;
    }
    return null;
  };
  return (
    <React.Fragment>
      <div id="mpc-wrapper">
        <div
          className="start-wrapper"
          style={{ backgroundColor: Colors.blue, color: Colors.black }}
        >
          <div className="content-container">
            <div style={{ backgroundColor: Colors.white, padding: "1vh 2vw" }}>
              <h1>
                Sampler
              </h1>
              {renderInstallButton()}
              {displayContent()}

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
