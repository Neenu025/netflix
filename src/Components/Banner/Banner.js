import React, { useEffect, useState} from 'react'
import {API_KEY, imageUrl} from "../../Constants/Constants"
import Axios from '../../Axios'
import "./Banner.css"


function Banner() {
  const [movie,setMovie] = useState()

  useEffect(() => {
    Axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const results = response.data.results;

        if (results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);

          setMovie(results[randomIndex]);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  
  return (
    <div style={{backgroundImage: `URL(${movie? imageUrl + movie.backdrop_path: ""})`}} 
    className='banner'>
        <div className="content">
            <h1 className='title'>{movie? movie.title : ""} </h1> 
            <div className="banner_buttons">
                <button className='button'>Play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='description'>{movie? movie.overview : ""}</h1>
        </div>
        <div className="fade_bottom">
            
        </div>
    </div>
  )
}

export default Banner