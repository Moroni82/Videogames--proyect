import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogameById } from "../actions/getVideogame";
import { Loader } from "./Loader";
import "./GameDetails.css";
import NavBar from "./navBar";

export const GameDetails = ({ id }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Videogame);
  // let history = useHistory();

  const [loader, setLoader] = useState(true);

  // const home = () => {
  //   history.push(`/home`)
  // }

  useEffect(() => {
    if (state.id) {
      setLoader(false);
    }
  }, [state]);

  useEffect(() => {
    dispatch(getVideogameById(id));
  }, [dispatch, id]);

  return (
    <div>
      {!loader && state.id.toString() === id.toString() ? (
        <>
          <NavBar className="nav" />
          <div className="conteiner">
            <img
              className="img"
              src={state.backgroundImage}
              alt={state.name}
            ></img>
            <div className="details">
              <h1>{state.name}</h1>
              <b>Genres</b>
              <h5>{state.genres}</h5>
              <b>Platforms</b>
              <h5>{state.platforms}</h5>
              <b>Rating</b>
              <h5>{state.rating}</h5>
            </div>
          </div>
          <p className="description">
            <b>Description :</b> <br />
            {state.description}
          </p>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
