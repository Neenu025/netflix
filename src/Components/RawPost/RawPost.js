import React, { useEffect, useState } from 'react';
import { imageUrl, API_KEY } from '../../Constants/Constants';
import Youtube from 'react-youtube';
import './RawPost.css';
import axios from '../../Axios';

function RawPost(props) {
  const [movie, setMovie] = useState([]);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios.get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data.results);
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
          console.error('The requested resource was not found.');
     
        } else {
          console.error('An unexpected error occurred:', error.message);
        
        }
      });
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
          // Youtube trailer usually comes in the 0th element
        } else {
          console.log('Trailer not available');
        }
      })
      .catch((error) => {
        console.error('Error fetching movie videos:', error.message);
        // Handle errors related to fetching movie videos
      });
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movie.map((obj) =>
          <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt='poster' />
        )}
      </div>
      {urlId && <Youtube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RawPost;
