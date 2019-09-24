import React, { useState, useContext } from "react";
import { Context } from "../../contexts/SamplerContext";
import { handlePadTrigger } from "../../actions";
import keyCTRL from "../../Config/keyboardControls";
import StartScreen from "../StartScreen/StartScreen";
import SamplerGrid from "../SamplerGrid/SamplerGrid";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [musicPlayer0, setMusicPlayer0] = useState("musicPlayer0");
  const [musicPlayer01, setMusicPlayer01] = useState("music-player1");
  const [musicPlayer02, setMusicPlayer02] = useState("music-player2l");
  const [musicPlayer03, setMusicPlayer03] = useState("music-player3");
  const [musicPlayer04, setMusicPlayer04] = useState("music-player4");
  const [musicPlayer05, setMusicPlayer05] = useState("music-player5");
  const [musicPlayer06, setMusicPlayer06] = useState("music-player6");
  const [musicPlayer07, setMusicPlayer07] = useState("music-player7");
  const [musicPlayer08, setMusicPlayer08] = useState("music-player8");
  const [musicPlayer09, setMusicPlayer09] = useState("music-player9");
  const [musicPlayer10, setMusicPlayer10] = useState("music-player10");

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

  const swapMPlayerRight = e => {

      if (musicPlayer01 === "music-player-2") {
        setMusicPlayer01("music-player-3");
      }
      if (musicPlayer01 === "music-player-1") {
        setMusicPlayer01("music-player-2");
      }
      if (musicPlayer01 === "music-player0") {
        setMusicPlayer01("music-player-1");
      }
    if (musicPlayer01 === "music-player1") {
      setMusicPlayer01("music-player0");
    }
    if (musicPlayer02 === "music-player2l" || musicPlayer02 === "music-player2r") {
      setMusicPlayer02("music-player1");
    }
    if (musicPlayer02 === "music-player1") {
      setMusicPlayer02("music-player0");
    }
    if (musicPlayer02 === "music-player0") {
      setMusicPlayer02("music-player-1");
    }
    if (musicPlayer02 === "music-player-1") {
      setMusicPlayer02("music-player-2");
    }
    if (musicPlayer03 === "music-player3") {
      setMusicPlayer03("music-player2l");
    }
    if (musicPlayer03 === "music-player2l" || musicPlayer03 === "music-player2r") {
      setMusicPlayer03("music-player1");
    }
    if (musicPlayer03 === "music-player1") {
      setMusicPlayer03("music-player0");
    }
    if (musicPlayer03 === "music-player0") {
      setMusicPlayer03("music-player-1");
    }
    if (musicPlayer04 === "music-player4") {
      setMusicPlayer04("music-player3");
    }
    if (musicPlayer04 === "music-player3") {
      setMusicPlayer04("music-player2l");
    }
    if (musicPlayer04 === "music-player2l" || musicPlayer04 === "music-player2r") {
      setMusicPlayer04("music-player1");
    }
    if (musicPlayer04 === "music-player1") {
      setMusicPlayer04("music-player0");
    }
    if (musicPlayer05 === "music-player5") {
      setMusicPlayer05("music-player4");
    }
    if (musicPlayer05 === "music-player4") {
      setMusicPlayer05("music-player3");
    }
    if (musicPlayer05 === "music-player3") {
      setMusicPlayer05("music-player2l");
    }
    if (musicPlayer05 === "music-player2l" || musicPlayer05 === "music-player2r") {
      setMusicPlayer05("music-player1");
    }
    // if (musicPlayer05 === "music-player1") {
    //   setMusicPlayer05("music-player0");
    // }
    // if (musicPlayer06 === "music-player7") {
    //   setMusicPlayer06("music-player6");
    //   console.log("logging state of 06", musicPlayer06);
    // }
    if (musicPlayer06 === "music-player6") {
      setMusicPlayer06("music-player5");
      console.log("logging state of 06", musicPlayer06);
    }
    if (musicPlayer06 === "music-player5") {
      setMusicPlayer06("music-player4");
      console.log("logging state of 06", musicPlayer06);
    }
    if (musicPlayer06 === "music-player4") {
      setMusicPlayer06("music-player3");
      console.log("logging state of 06", musicPlayer06);
    }
    if (musicPlayer06 === "music-player3") {
      setMusicPlayer06("music-player2l");
      console.log("logging state of 06", musicPlayer06);
    }
    // if (musicPlayer06 === "music-player2") {
    //   setMusicPlayer06("music-player1");
    // }
    // if (musicPlayer06 === "music-player1") {
    //   setMusicPlayer06("music-player0");
    // }
    if (musicPlayer07 === "music-player7") {
      setMusicPlayer07("music-player6");
    }
    if (musicPlayer07 === "music-player6") {
      setMusicPlayer07("music-player5");
    }
    if (musicPlayer07 === "music-player5") {
      setMusicPlayer07("music-player4");
    }
    if (musicPlayer07 === "music-player4") {
      setMusicPlayer07("music-player3");
    }
    // if (musicPlayer07 === "music-player3") {
    //   setMusicPlayer07("music-player2");
    // }
    // if (musicPlayer07 === "music-player2") {
    //   setMusicPlayer07("music-player1");
    // }
    // if (musicPlayer07 === "music-player1") {
    //   setMusicPlayer07("music-player0");
    // }

  };

  const swapMPlayerLeft = e => {
      if (musicPlayer07 === "music-player3") {
        setMusicPlayer07("music-player4");
      }
      if (musicPlayer07 === "music-player4") {
        setMusicPlayer07("music-player5");
      }
      if (musicPlayer07 === "music-player5") {
        setMusicPlayer07("music-player6");
      }
      if (musicPlayer07 === "music-player6") {
        setMusicPlayer07("music-player7");
      }
      if (musicPlayer06 === "music-player2l" || musicPlayer05 === "music-player2r") {
        setMusicPlayer06("music-player3");
        console.log("logging state of 06", musicPlayer06);
      }
      if (musicPlayer06 === "music-player3") {
        setMusicPlayer06("music-player4");
        console.log("logging state of 06", musicPlayer06);
      }
      if (musicPlayer06 === "music-player4") {
        setMusicPlayer06("music-player5");
        console.log("logging state of 06", musicPlayer06);
      }
      if (musicPlayer06 === "music-player5") {
        setMusicPlayer06("music-player6");
        console.log("logging state of 06", musicPlayer06);
      }
      // if (musicPlayer06 === "music-player6") {
      //   setMusicPlayer06("music-player7");
      //   console.log("logging state of 06", musicPlayer06);
      // }
      if (musicPlayer05 === "music-player6") {
        setMusicPlayer05("music-player7");
      }
      // if (musicPlayer05 === "music-player5") {
      //   setMusicPlayer05("music-player6");
      // }
      if (musicPlayer05 === "music-player4") {
        setMusicPlayer05("music-player5");
      }
      if (musicPlayer05 === "music-player3") {
        setMusicPlayer05("music-player4");
      }
      if (musicPlayer05 === "music-player2l" || musicPlayer05 === "music-player2r") {
        setMusicPlayer05("music-player3");
      }
      if (musicPlayer05 === "music-player1") {
        setMusicPlayer05("music-player2r");
      }
      if (musicPlayer04 === "music-player3") {
        setMusicPlayer04("music-player4");
      }
      if (musicPlayer04 === "music-player2l" || musicPlayer04 === "music-player2r") {
        setMusicPlayer04("music-player3");
      }
      if (musicPlayer04 === "music-player1") {
        setMusicPlayer04("music-player2r");
      }
      if (musicPlayer04 === "music-player0") {
        setMusicPlayer04("music-player1");
      }

      // if (musicPlayer03 === "music-player4") {
      //   setMusicPlayer03("music-player5");
      // }
      // if (musicPlayer03 === "music-player3") {
      //   setMusicPlayer03("music-player4");
      // }
      if (musicPlayer03 === "music-player2l" || musicPlayer03 === "music-player2r") {
        setMusicPlayer03("music-player3");
      }
      if (musicPlayer03 === "music-player1") {
        setMusicPlayer03("music-player2r");
      }
      if (musicPlayer03 === "music-player0") {
        setMusicPlayer03("music-player1");
      }
      if (musicPlayer03 === "music-player-1") {
        setMusicPlayer03("music-player0");
      }


    //
    //   if (musicPlayer02 === "music-player2") {
    //     setMusicPlayer02("music-player1");
    //   }
    //   if (musicPlayer02 === "music-player3") {
    //     setMusicPlayer02("music-player4")
    // }
    // if (musicPlayer02 === "music-player2") {
    //   setMusicPlayer02("music-player3");
    // }
    if (musicPlayer02 === "music-player1") {
      setMusicPlayer02("music-player2r")
  }
  if (musicPlayer02 === "music-player0") {
    setMusicPlayer02("music-player1");
  }
  if (musicPlayer02 === "music-player-1") {
     setMusicPlayer02("music-player0");
   }
   if (musicPlayer02 === "music-player-2") {
      setMusicPlayer02("music-player-1");
    }

  // if (musicPlayer01 === "music-player5") {
  //   setMusicPlayer01("music-player6");
  // }
  // if (musicPlayer01 === "music-player3") {
  //   setMusicPlayer01("music-player4");
  // }
  // if (musicPlayer01 === "music-player2") {
  //   setMusicPlayer01("music-player3");
  // }
  // if (musicPlayer01 === "music-player1") {
  //   setMusicPlayer01("music-player2");
  // }
  if (musicPlayer01 === "music-player0") {
    setMusicPlayer01("music-player1");
  }
  if (musicPlayer01 === "music-player-1") {
     setMusicPlayer01("music-player0");
   }
   if (musicPlayer01 === "music-player-2") {
      setMusicPlayer01("music-player-1");
    }
    if (musicPlayer01 === "music-player-3") {
       setMusicPlayer01("music-player-2");
     }




  };

  // const subtracter = function(n) {
  //   return n - 1;
  // };
  //
  // console.log("subtracter", subtracter(1));
  //
  // const swapMPlayerRight = e => {
  //   if (musicPlayer01) {
  //     setMusicPlayer01(`music-player${subtracter(1)}`);
  //     console.log("TEST: ", musicPlayer01);
  // }
  //
  //   if (musicPlayer02) {
  //     setMusicPlayer01(`music-player${subtracter(2)}`);
  //     console.log("musicPlayer02 in app:", musicPlayer02);
  //   }
  //
  //   if (musicPlayer03) {
  //     setMusicPlayer03(`music-player${subtracter(3)}`);
  //   }
    // if (musicPlayer04) {
    //   setMusicPlayer03("music-player02");
    // }
    // if (musicPlayer05) {
    //   setMusicPlayer03("music-player01");
    // }
    // if (musicPlayer06) {
    //   setMusicPlayer03("music-player-hidden");
    // }
    // if (musicPlayer07) {
    //   setMusicPlayer04("music-player03");
    // }
  // };

  return (
    <React.Fragment>
      <div id="body-wrapper">
        <header></header>

        <div className="logo-container">
          <h1 className="logo">ALGERNON CORNELIUS</h1>
        </div>
        <div className="tour-dates"><h2>NEXT GIG</h2>
        <p>The Cockpit, Leeds</p></div>
        <div className="tour-dates2"><h2>OCT</h2></div>
        <div className="tour-dates3"><h2>31</h2></div>
        <div className="box"></div>
        <div className="box02"></div>
        <div onClick={swapMPlayerLeft} className="albums-left">

        </div>
        <div onClick={swapMPlayerRight} className="albums-right">

        </div>

        <div className="video-wrapper">
          <iframe
            className="video"
            src="https://www.youtube.com/embed/vFNbj8KI0Rc?start=3&controls=0&showinfo=0&loop=1&modestbranding=1"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>

        <iframe
          className={musicPlayer01}
          src="https://bandcamp.com/EmbeddedPlayer/track=97838974/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/track/as-long-as-theres-you">
            As Long As There&#39;s You by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer02}
          src="https://bandcamp.com/EmbeddedPlayer/track=2424298729/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/track/adieu">
            Adieu by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer03}
          src="https://bandcamp.com/EmbeddedPlayer/track=2431711501/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/track/radio-edit">
            Radio Edit by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer04}
          src="https://bandcamp.com/EmbeddedPlayer/track=4044113520/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/track/absolute-badman-riddim">
            Absolute Badman Riddim by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer05}
          src="https://bandcamp.com/EmbeddedPlayer/album=1535006646/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/album/who-knows-maybe-they-speak-for-you">
            Who Knows? Maybe They Speak For You by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer06}
          src="https://bandcamp.com/EmbeddedPlayer/album=1122987924/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/album/exit-the-wu-tang-36-chambers-ac-version">
            Exit the Wu-Tang: 36 Chambers (AC Version) by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer07}
          src="https://bandcamp.com/EmbeddedPlayer/album=3420241321/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/album/algernoncornelius-dark-beats-only-quit-yer-sen">
            AlgernonCornelius - dARK bEATS oNLY / Quit Yer Sen - ^ by Algernon
            Cornelius
          </a>
        </iframe>

        {!showModal && (
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
