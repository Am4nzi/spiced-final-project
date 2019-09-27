import React, { useState, useEffect } from "react";
import Sampler from "./sampler";
import Tone from "tone";

export default function App() {
  const [showModalValue, setShowModalValue] = useState(false);
  const [showModalTourValue, setShowModalTourValue] = useState(true);
  const [expandIconClass, setExpandIconClass] = useState("open-tour-dates-modal");
  const [showHideTourDates, setShowHideTourDates] = useState("tour-dates-container-default")
  const [bpm, setBpm] = useState();
  const [musicPlayer0, setMusicPlayer0] = useState("musicPlayer0");
  const [musicPlayer01, setMusicPlayer01] = useState("music-player1");
  const [musicPlayer02, setMusicPlayer02] = useState("music-player2l");
  const [musicPlayer03, setMusicPlayer03] = useState("music-player3");
  const [musicPlayer04, setMusicPlayer04] = useState("music-player4");
  const [musicPlayer05, setMusicPlayer05] = useState("music-player5");
  const [musicPlayer06, setMusicPlayer06] = useState("music-player6");
  const [musicPlayer07, setMusicPlayer07] = useState("music-player7");

  const showModal = function() {
    if (showModalValue === false) {
      setShowModalValue(true);
    } else if (showModalValue === true) {
      setShowModalValue(false);
    }
  };

  // const showModalTour = function() {
  //   if (showModalTourValue === false) {
  //     setShowModalTourValue(true);
  // } else if (showModalTourValue === true) {
  //     setShowModalTourValue(false);
  //   }
  // };

  const showModalTour = function() {
    if (showHideTourDates === "tour-dates-container-default") {
     setShowHideTourDates("tour-dates-container");
  } else if (showHideTourDates === "tour-dates-container") {
      setShowHideTourDates("tour-dates-container-hide");
  } else if (showHideTourDates === "tour-dates-container-hide") {
        setShowHideTourDates("tour-dates-container");
      }

      if (expandIconClass === "open-tour-dates-modal") {
       setExpandIconClass("open-tour-dates-modal-rotate");
   } else if (expandIconClass === "open-tour-dates-modal-rotate") {
     setExpandIconClass("open-tour-dates-modal");
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
    if (
      musicPlayer02 === "music-player2l" ||
      musicPlayer02 === "music-player2r"
    ) {
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
    if (
      musicPlayer03 === "music-player2l" ||
      musicPlayer03 === "music-player2r"
    ) {
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
    if (
      musicPlayer04 === "music-player2l" ||
      musicPlayer04 === "music-player2r"
    ) {
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
    if (
      musicPlayer05 === "music-player2l" ||
      musicPlayer05 === "music-player2r"
    ) {
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
    if (
      musicPlayer06 === "music-player2l" ||
      musicPlayer05 === "music-player2r"
    ) {
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
    if (
      musicPlayer05 === "music-player2l" ||
      musicPlayer05 === "music-player2r"
    ) {
      setMusicPlayer05("music-player3");
    }
    if (musicPlayer05 === "music-player1") {
      setMusicPlayer05("music-player2r");
    }
    if (musicPlayer04 === "music-player3") {
      setMusicPlayer04("music-player4");
    }
    if (
      musicPlayer04 === "music-player2l" ||
      musicPlayer04 === "music-player2r"
    ) {
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
    if (
      musicPlayer03 === "music-player2l" ||
      musicPlayer03 === "music-player2r"
    ) {
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
      setMusicPlayer02("music-player2r");
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

        {showModalTourValue && (
        <div className={showHideTourDates}>

          <p>31 SEPTEMBER</p>
          <p>Brudenell Social Club</p>
          <p className="city">Leeds, England</p>
          <p className="get-tickets">Get Tickets</p>

          <p>3 OCTOBER</p>
          <p>The Deaf Institute</p>
          <p className="city">Manchester, England</p>
          <p className="get-tickets">Get Tickets</p>

          <p>11 OCTOBER</p>
          <p>DIY Spice for London</p>
          <p className="city">London, England</p>
          <p className="get-tickets">Get Tickets</p>

          <p>12 OCTOBER</p>
          <p>The ShackleWell Arms</p>
          <p className="city">London, England</p>
          <p className="get-tickets">Get Tickets</p>

          <p>13 OCTOBER</p>
          <p>The Windmill</p>
          <p className="city">London, England</p>
          <p className="get-tickets">Get Tickets</p>

          <p>25 OCTOBER</p>
          <p>Loophole</p>
          <p className="city">Berlin, Germany</p>
          <p className="get-tickets">Get Tickets</p>

          <p>26 OCTOBER</p>
          <p>MultiTonal Festival @ Kraftwerk</p>
          <p className="city">Berlin, Germany</p>
          <p className="get-tickets">Get Tickets</p>

          <p>27 OCTOBER</p>
          <p>ACUD MACHT NEU</p>
          <p className="city">Berlin, Germany</p>
          <p className="get-tickets">Get Tickets</p>

          <p>31 OCTOBER</p>
          <p>Vega Musikkens Hus</p>
          <p className="city">Copenhagen, Demark</p>
          <p className="get-tickets">Get Tickets</p>

          <p>1 November</p>
          <p>Underwerket</p>
          <p className="city">Copenhagen, Demark</p>
          <p className="get-tickets">Get Tickets</p>

          <p>4 November</p>
          <p>The Legends Bar</p>
          <p className="city">Frederikssund, Denmark</p>
          <p className="get-tickets">Get Tickets</p>

          <p>23 November</p>
          <p>Strange Forms Festival</p>
          <p className="city">Leeds, England</p>
          <p className="get-tickets">Get Tickets</p>

          <p>24 November</p>
          <p>Strange Forms Festival</p>
          <p className="city">Leeds, England</p>
          <p className="get-tickets">Get Tickets</p>

        </div>
        )}

        <div className="tour-dates">
          <h2 className="next-gig">NEXT GIG</h2>
        </div>
        <div className="tour-dates2">
          <h2>SEPT</h2>
        </div>
        <div className="tour-dates3">
          <h2>31</h2>
        </div>
        <div className="tour-dates-expand">
          <img
            className={expandIconClass}
            onClick={showModalTour}
            src="/images/expand.png"
          />
        </div>
        <div className="see-all-dates">
          <p>SEE ALL GIGS</p>
        </div>


        {showModalValue && (
          <div className="sampler-container">
            <img
              className="close-modal"
              onClick={showModal}
              src="/images/close.png"
            />
            <Sampler />
          </div>
        )}

        <div className="sampler-opener" onClick={showModal}>
          <img
            className="open-modal"
            onClick={showModal}
            src="/images/expand.png"
          />
        </div>
        <div className="sampler-opener-text">
          <h2>MAKE YOUR OWN BEATS</h2>
        </div>

        <div className="logo-container">
        <img className="logo"

          src="/images/logo.png"
        />
        </div>


        <div className="box"></div>
        <div className="box02"></div>
        <div onClick={swapMPlayerLeft} className="albums-left"></div>
        <div onClick={swapMPlayerRight} className="albums-right"></div>

        <div className="video-wrapper">
          <iframe
            className="video"
            src="https://www.youtube.com/embed/vFNbj8KI0Rc?start=3&controls=0&showinfo=0&loop=1&modestbranding=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>

        <iframe
          className={musicPlayer01}
          src="https://bandcamp.com/EmbeddedPlayer/album=3937120203/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/album/in2trumentals">
            In2trumentals by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer02}
          src="https://bandcamp.com/EmbeddedPlayer/album=860871374/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/album/1nstrumentals">
            1nstrumentals by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer03}
          src="https://bandcamp.com/EmbeddedPlayer/album=897381078/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/album/instrum3ntals">
            Instrum3ntals by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer04}
          src="https://bandcamp.com/EmbeddedPlayer/album=2117210254/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/album/botanical">
            Botanical by Algernon Cornelius
          </a>
        </iframe>

        <iframe
          className={musicPlayer05}
          src="https://bandcamp.com/EmbeddedPlayer/album=557612822/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        >
          <a href="http://algernoncornelius.bandcamp.com/album/dock-heist-unit-sp404lofilosttapecirca96monomix">
            Dock Heist Unit (SP404LOFILOSTTAPECIRCA96MONOMIX) by Algernon
            Cornelius
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
      </div>
    </React.Fragment>
  );
}
