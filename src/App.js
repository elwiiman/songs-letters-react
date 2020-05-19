import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Song from "./components/Song";
import Info from "./components/Info";
import axios from "axios";

function App() {
  const [searchedSong, setSearchedSong] = useState({});
  const [lyric, setLyric] = useState("");
  const [info, setInfo] = useState({});
  useEffect(() => {
    if (Object.keys(searchedSong).length === 0) {
      return;
    }

    const consultLyricsOVH = async () => {
      const { artist, song } = searchedSong;
      const url1 = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

      const [responseLyric, responseInfo] = await Promise.all([
        axios(url1),
        axios(url2),
      ]);
      setLyric(responseLyric.data.lyrics);
      setInfo(responseInfo.data.artists[0]);
    };

    consultLyricsOVH();
  }, [searchedSong, info]);

  return (
    <Fragment>
      <Form setSearchedSong={setSearchedSong}></Form>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Song lyric={lyric} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
