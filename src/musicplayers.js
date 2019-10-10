import React, { useState, useEffect } from "react";

export default function MusicPlayers() {
  const [albumPosition0, setAlbumPosition0] = useState(0);
  const [albumPosition1, setAlbumPosition1] = useState(1);
  const [albumPosition2, setAlbumPosition2] = useState(2);
  const [albumPosition3, setAlbumPosition3] = useState(3);
  const [albumPosition4, setAlbumPosition4] = useState(4);

  const prevAlbum = e => {
    if (albumPosition0 <= 0) {
      setAlbumPosition0(4);
    } else {
      setAlbumPosition0(albumPosition0 - 1);
    }

    if (albumPosition1 <= 0) {
      setAlbumPosition1(4);
    } else {
      setAlbumPosition1(albumPosition1 - 1);
    }

    if (albumPosition2 <= 0) {
      setAlbumPosition2(4);
    } else {
      setAlbumPosition2(albumPosition2 - 1);
    }

    if (albumPosition3 <= 0) {
      setAlbumPosition3(4);
    } else {
      setAlbumPosition3(albumPosition3 - 1);
    }

    if (albumPosition4 <= 0) {
      setAlbumPosition4(4);
    } else {
      setAlbumPosition4(albumPosition4 - 1);
    }
  };

  const nextAlbum = e => {
    if (albumPosition0 >= 4) {
      setAlbumPosition0(0);
    } else {
      setAlbumPosition0(albumPosition0 + 1);
    }

    if (albumPosition1 >= 4) {
      setAlbumPosition1(0);
    } else {
      setAlbumPosition1(albumPosition1 + 1);
    }

    if (albumPosition2 >= 4) {
      setAlbumPosition2(0);
    } else {
      setAlbumPosition2(albumPosition2 + 1);
    }

    if (albumPosition3 >= 4) {
      setAlbumPosition3(0);
    } else {
      setAlbumPosition3(albumPosition3 + 1);
    }

    if (albumPosition4 >= 4) {
      setAlbumPosition4(0);
    } else {
      setAlbumPosition4(albumPosition4 + 1);
    }
  };

  return (
    <React.Fragment>
      <div className="albums-wrapper">

        <div className="next-album" onClick={nextAlbum}></div>

        <img className="prev-album-arrow" onClick={nextAlbum} src="/images/right-arrow.png" />

        <div className="prev-album" onClick={prevAlbum}></div>

        <img className="next-album-arrow"  onClick={prevAlbum} src="/images/right-arrow.png" />

        <iframe
          className={`album-position${albumPosition0}`}
          src="https://bandcamp.com/EmbeddedPlayer/album=897381078/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        ></iframe>

        <iframe
          className={`album-position${albumPosition1}`}
          src="https://bandcamp.com/EmbeddedPlayer/album=860871374/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        ></iframe>

        <iframe
          className={`album-position${albumPosition2}`}
          src="https://bandcamp.com/EmbeddedPlayer/album=3937120203/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        ></iframe>

        <iframe
          className={`album-position${albumPosition3}`}
          src="https://bandcamp.com/EmbeddedPlayer/album=557612822/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        ></iframe>

        <iframe
          className={`album-position${albumPosition4}`}
          src="https://bandcamp.com/EmbeddedPlayer/album=2117210254/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/"
          seamless
        ></iframe>
      </div>
    </React.Fragment>
  );
}
