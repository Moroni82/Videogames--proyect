import React from 'react';
import NavBar from './navBar';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideogames } from '../actions/getVideogames';
import { getGenres } from '../actions/getGenres';
import { Loader } from './Loader';
import './Home.css';

const sorts = {
    RA : (game1, game2) => {
      return game2.rating - game1.rating},

    LR : (game1, game2) => {
      return game1.rating - game2.rating},

    ZA: (game1, game2) => {
      if(game1.name > game2.name) return -1
      if(game2.name > game1.name) return 1 
    },

    AZ: (game1, game2) => {
      if(game1.name < game2.name) return -1
      if(game2.name < game1.name) return 1 
    },

    Default: (game1, game2) => {
      return game2.rating - game1.rating},
  }

const Home = () => {
  
  const dispatch = useDispatch()
  let history = useHistory();
  
  const state = useSelector(state => state.Videogames)
  const genre = useSelector(state => state.Genres)

  
  const [ games, setGames ] = useState([]);
  const [ genres, setGenres ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(0)
  const [ loading, setLoading ] = useState(true);
  const [ searchName, setSearchName ] = useState("");
  const [ checked, setChecked ] = useState(false);
  const [ sort, setSort ] = useState('sort');
  const [ filter, setFilter ] = useState('');


  let repliedState = [...state];

  const gamesPerPage = 15;
  const pagesVisited = pageNumber * gamesPerPage;
  const maxPages = Math.ceil( games.length / gamesPerPage )

  useEffect(() => {
    dispatch(getVideogames())
    dispatch(getGenres())
  },[dispatch])

  useEffect(() => {
    setGames(state);
    if(state.length) {
      setLoading(false)
    }
  }, [state]);

  useEffect(() => {
    setGenres(genre);
  }, [genre]);

  useEffect(() => {
    setGames([...state].sort(sorts[sort]))
    setPageNumber( 0 )
  }, [sort, state])

  useEffect(() => {
    if(filter || checked){
      setGames([...state].filter(el => {
        if(!filter || el.genres.includes(filter)){
          if(checked){
            return isNaN(el.id)
          }
          return true
        }
        return false;
      }).sort(sorts[sort]))
    } else {
      setGames([...state].sort(sorts[sort]))
    }
  }, [filter, checked, state, sort])

  function handleName(e) {
    e.preventDefault()
    if(searchName.length){
    dispatch(getVideogames(searchName))
      setGames(repliedState)
    } 
    else{
      setLoading(true)
      dispatch(getVideogames())
      setGames(repliedState);
      setSort('sort')
      setFilter('')
      setChecked(false)
    }
  }


  // const handleGenre = (e) => {
  //  setGames(repliedState.filter(game => game.genres.includes(e.target.value)
  //   ))
  //   setPageNumber( 0 )
  // }

 

  
 const handleSort = (e) => {
  setSort(e.target.value)
 }

 const handleFilter = (e) => {
  setFilter(e.target.value)
 }

  function MoreInfo(e) {
    history.push(`/detail/${e.target.value}`)
  }

  const nextPage = () => {
    setPageNumber( pageNumber+1 )
  }

  const previousPage = () => {
    setPageNumber( pageNumber-1 )
  }
  
  return (
    <div>
      {
        loading ? (
        <Loader />
        ) : (
          <>
          <div className="naveg">
      <NavBar />
          </div>
    <form  onSubmit={handleName} className="formulario">
      <div className="filter">
        <select onChange={handleFilter}  defaultValue="" className="slct">
          <option value="" selected="selected" hidden="hidden" className="filterby"> Filter by </option>
          <optgroup label="Genres">
            {
              genres.map(genre => <option key={genre.id} value={genre.name}> {genre.name} </option>)
            }
          </optgroup>
          </select>
      </div>
      <div className="sort">
          <select value={sort} onChange={handleSort} className="sortSelect">
            <option value="Sort" selected="selected" hidden="hidden"> Sort </option>
          <optgroup label="Rating"></optgroup>
          <option value="RA"> + Rating </option>
          <option value="LR"> - Rating </option>
          <optgroup label="Alphabetically"></optgroup>
          <option value="AZ" > A-Z </option>
          <option value="ZA" > Z-A </option>
        </select>
      </div> 
      <div className="form__group field">
        <input type="input" className="form__field" onChange={(e) => setSearchName(e.target.value)} value={searchName} placeholder="Name" name="name" id='name' />
        <label for="name" className="form__label" >Search videogame</label>
      </div>
      <div className="created">
        <input type="checkbox" name="created" checked={checked} onChange={(e) => setChecked(e.target.checked)}></input>
        <label htmlFor="created"> Created by User </label>
      </div>
    </form>
      <div className="palcostado">
       <div className="contorno">
        <div className="diver">
            { 
            !games.length ? <h1> Game not found </h1>
            :            
            games
              .slice(pagesVisited, pagesVisited + gamesPerPage)
              .map(game => <>
               <figure key={game.id} class="image-block">
                <img key={game.id} src={game.backgroundImage} alt={game.name} />
                <figcaption key={game.id} >
                  <h3 key={game.id} >
                    {game.name}
                  </h3>
                  <h5 key={game.id} >{game.genres}</h5>
                  <button key={game.id} className="button" value={game.id} onClick={MoreInfo}>
                    More Info
                  </button>
                </figcaption>
              </figure>
              </>)}       
        </div>
        </div>
        </div>
        <div className="paginate">
          <button onClick={previousPage} className={
            pageNumber <= 0 || games.length === 0 ? "Bttn-No-visible" : "Bttn-visible"
            }><i> {"Prev"} </i></button>
            <b className="pagenumber">{pageNumber}</b>
         <button onClick={nextPage} className={
           pageNumber === maxPages-1 || games.length === 0 ? "Bttn-No-visible" : "Bttn-visible"
         }><i> {'Next'} </i></button>
        </div>
      </>
      )
    }
    </div>
  )
  }

export default Home

