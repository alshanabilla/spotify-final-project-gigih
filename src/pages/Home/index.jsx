import React, { useEffect, useState } from 'react'
import Track from '../../components/Track';
import SearchBar from '../../components/SearchBar';
import config from '../../lib/config';
import CreatePlaylist from '../../components/CreatePlaylist';
import { getUserProfile } from '../../lib/fetchApi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../slice/auth-slice";

function Home() {
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const [user, setUser] = useState({});
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);
  const dispatch = useDispatch();


  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');

    if (accessTokenParams !== null) {
      dispatch(login(accessTokenParams));

      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(accessTokenParams);

          setUser(response);
        } catch (error) {
          alert(error);
        }
      }

      setUserProfile();
    }
  }, []);

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=https://spotify-final-project-gigih-n856smy4s-alshanabilla.vercel.app/&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])])
  }

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  return (
    <>
      {!isAuthorize && (
      <div className="center">
          
            <a href={getSpotifyLinkAuthorize()}>Login</a>
            </div>
      )}

      {isAuthorize && (
        <div className="container" id="home">
          <CreatePlaylist
            userId={user.id}
            uriTracks={selectedTracksUri}
          />
          <hr />
          <SearchBar
              onSuccess={onSuccessSearch}
          />
        <div className="playlist-content">
            {tracks.length === 0 && (
                  <p>No tracks</p>
                )}
            <div className="playlist-tracks">
              {tracks.map((track) => (
                <Track
                  key={track.id}
                  imageUrl={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  toggleSelect={() => toggleSelect(track)}
                />
              ))}
            </div>
          </div>
      </div> 
          )}        
    </>
  );
}

export default Home;