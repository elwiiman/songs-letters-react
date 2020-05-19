import React, { useState } from "react";

const Form = ({ setSearchedSong }) => {
  const [search, setSearch] = useState({ artist: "", song: "" });
  const [error, setError] = useState(false);

  const { artist, song } = search;

  //function for each input to read content
  const handleInput = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  //consultAPI's

  const doSearch = async (e) => {
    e.preventDefault();

    //Validate form
    if (artist.trim() === "" || song.trim() === "") {
      setError(true);
      return;
    }

    //if all ok
    setError(false);
    setSearchedSong(search);
  };

  return (
    <div className="bg-info">
      {error ? (
        <p className="alert alert-danger text-center p-2">
          All fields are mandatory
        </p>
      ) : null}
      <div className="container">
        <div className="row">
          <form
            onSubmit={doSearch}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fieldset>
              <legend className="text-center">Song and Letters Searcher</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artist</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artist"
                      placeholder="Artist"
                      onChange={handleInput}
                      value={artist}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Song</label>
                    <input
                      type="text"
                      className="form-control"
                      name="song"
                      placeholder="Song"
                      onChange={handleInput}
                      value={song}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary float-right">
                Search
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
