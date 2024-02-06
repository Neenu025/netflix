import React, {useEffect,useState} from 'react'
import {imageUrl} from "../../Constants/Constants"
import Youtube from "react-youtube"
import "./RawPost.css"
import axios from '../../Axios'

function RawPost(props) {
  const [movie,setMovie] = useState([])

  useEffect(() => {
    axios.get(props.url).then(Response =>{
      console.log(Response.data)
      setMovie(Response.data.results)

    }).catch(err=>{
      alert("Network error")
    })
  
  }, [])


  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movie.map((obj)=>
             <img className={props.isSmall? 'smallPoster':'poster'} src={`${imageUrl+obj.backdrop_path}`} alt='poster'/>
          )}
          
           
           
        </div>

    </div>
  )
}

export default RawPost