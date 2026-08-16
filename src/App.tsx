import './App.css'
import { useState, useEffect } from 'react'
import getMovies from './apiServices/getMovies'
import type { Movie } from './types/movieTypes'
import placeholderPoster from './assets/coming_soon.jpg'

const posterBasePath = 'https://image.tmdb.org/t/p/original/'
const languageSelectList = [
  { isoCode: "en", language: "English" },
  { isoCode: "es", language: "Spanish" },
  { isoCode: "fr", language: "French" },
  { isoCode: "ar", language: "Arabic" },
  { isoCode: "de", language: "German" },
  { isoCode: "ko", language: "Korean" },
  { isoCode: "ru", language: "Russian" },
  { isoCode: "hi", language: "Hindi" },
  { isoCode: "pt", language: "Portuguese" },
  { isoCode: "zh", language: "Chinese (Mandarin)" },
];

function App () {
  const [year, setYear] = useState<number>(2026)
  const [language, setLanguage] = useState<string>('en')
  const [selected, setSelected] = useState<null | number>(null)
  const [movieList, setMovieList] = useState<Movie[]>([])

  useEffect(()=>{
    const movieSearch = async () =>{
      const movies = await getMovies(Number(year), language )
      setMovieList(movies?.results)
    }

    movieSearch()

  }, [year, language])

  const handleSelectedMovie = (sel: number) =>{
    if (sel !== selected) {
      setSelected(sel)
    } else {
      setSelected(null)
    }
  }

  const searchFormHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault() 

    const form = e.target
    const formData = new FormData(form)
    const formYear = formData.get('year') ?? '2026'
    const formLang = formData.get('original language') 

    setYear(Number(formYear))
    setLanguage(String(formLang))
  }

  // console.log(movieList)
  const languageSelect = languageSelectList.map((lang, index) => {
    return (
      <option key={index} value={lang.isoCode}>{lang.language}</option>
    )
  })
  const movieGrids = movieList.map((mov, index) =>{
    return (
      <div
        key={index}
        onClick={()=>handleSelectedMovie(index)}
        className="movie-poster-container"
      >
        <img
          src={mov.poster_path ? (posterBasePath + mov.poster_path) : placeholderPoster}
          alt={`movie number ${index} in movie search result`}
          className="movie-poster"
          
        />
        <h4 className="movie-title">{mov.title}</h4>

        {
          index === selected ? 
          <p>
            {mov.overview}
          </p>
          :
          null
        }
      </div>
    )
  })

  return (
    <div className="main-container">
      <h1>DISCOVERBOXD</h1>
      <div>
        <p>Discover the most popular movies from around the world throughout history!</p>
      </div>
      <form className="search-form" onSubmit={searchFormHandler}>
        <div className="form-container">
          <label>Year</label>
          <input 
            type="text"
            id="year"
            name="year"
          />
        </div>
        <div className="form-container">
          <label>Original Language</label>
          <select name="original language" id="original-language">
            {languageSelect}
          </select>
        </div>
        <div className="form-container">
          <button type="submit">Search</button>
        </div>
      </form>
      <div className="movie-grid">
      {movieGrids}
      </div>
    </div>
  )
}

export default App