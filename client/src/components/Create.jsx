import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import "./Create.css";
import { useSelector, useDispatch } from "react-redux";
import { getGenres } from "../actions/getGenres";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialForm = {
  name: "",
  description: "",
  date: "",
  rating: "",
  genres: [],
  platforms: [],
  backgroundImage: "",
  imageUrl:" ",
};

const validate = (form) => {
  const errors = {};
  if (!form.name) {
    errors.name = "Name is required.";
  }
  if (!form.description) {
    errors.description = "Description is required.";
  }
  if (!form.date) {
    errors.date = "Release Date is required.";
  } else if (
    !/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
      form.date
    )
  ) {
    errors.date = "Date is invalid.";
  }
  if (!form.rating) {
    errors.rating = "Rating is required.";
  } else if (!/[0-5]/.test(form.rating) || form.rating.length > 1) {
    errors.rating = "Rating must be from 0 to 5!";
  }
  return errors;
};

const Create = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.Genres);
  const repliedState = [...state];

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectGenre = (e) => {
    const [id, name] = e.target.value.split("/");
    if (!form.genres.some((el) => el.id === id) && form.genres.length < 6) {
      setForm({
        ...form,
        genres: [...form.genres, { id, name }],
      });
    } 
  }
    
  const handleSelectPlatform = (e) => {
    if (!form.platforms.includes(e.target.value)) {
      setForm({
        ...form,
        platforms: [...form.platforms, e.target.value],
      });
    } else {
      return;
    }
  }

  const setImage = (e) => {
    setForm({
      ...form,
      backgroundImage: e.target.value,
    });
    setImageUrl(e.target.value);
  };

  const FilterSelected = (e) => {
    if (e.target.title === "genre") {
      const genreId = e.target.attributes.genreId.nodeValue;
      setForm({
        ...form,
        genres: form.genres.filter((genre) => genre.id !== genreId),
      });
    } else {
      const platformName = e.target.attributes.platformName.nodeValue;
      setForm({
        ...form,
        platforms: form.platforms.filter(
          (platform) => platform !== platformName
        ),
      });
    }
  };

  const sendInput = (e) => {
    e.preventDefault();
    setErrors(validate(form));
    if (Object.keys(errors).length === 0) {
      const videogame = {
        ...form,
        genres: form.genres.map((el) => el.id),
        platforms: form.platforms.join(", "),
      };
      axios.post(`http://localhost:3001/videogame/`, videogame);
    }
    setForm(initialForm);
    setImageUrl('')
    alert("Game has been created!");
  };

  const handleClick = (e) => {
    history.push("/home");
  };
  return (
    <div>
      <header className="nav">
        <NavBar />
      </header>
      <div className="form-conteiner">
        <button onClick={handleClick} className="home"> ← </button>
        <form>
          <div className="flexflex">
            <div className="inputs">
              <input
                className={errors.name && "danger"}
                title="name"
                required
                value={form.name}
                name="name"
                type="text"
                placeholder="Name of videogame"
                onChange={handleInputChange}
              ></input>
              {errors.name && <p className="danger">{errors.name}</p>}
              <input
                className={errors.date && "danger"}
                title="date"
                required
                value={form.date}
                name="date"
                type="text"
                placeholder="Release date"
                onChange={handleInputChange}
              ></input>
              {errors.date && <p className="danger">{errors.date}</p>}
              <input
                className={errors.rating && "danger"}
                title="rating"
                required
                value={form.rating}
                name="rating"
                type="text"
                placeholder="Rating"
                onChange={handleInputChange}
              ></input>
              {errors.rating && <p className="danger">{errors.rating}</p>}
              <textarea
                type="text"
                className={errors.description && "danger"}
                title="description"
                required
                value={form.description}
                name="description"
                placeholder="Description"
                onChange={handleInputChange}
              ></textarea>
              {errors.description && <p className="danger">{errors.description}</p>}
              <input
                placeholder="Image Url"
                title="url"
                value={imageUrl}
                onChange={setImage}
              ></input>
              <div className="selectores">
                <div className="genres">
                  <label htmlFor="genres"></label>
                  <select
                    defaultValue=""
                    title="genres"
                    name="genres"
                    id="genres"
                    className="selectGenre"
                    onChange={handleSelectGenre}
                  >
                    <option value="" hidden="hidden">Genres</option>
                    {repliedState.map((genre) => (
                      <option
                        key={genre.name}
                        value={`${genre.id}/${genre.name}`}
                      >
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="platforms">
                  <label htmlFor="platforms"></label>
                  <select
                    defaultValue=""
                    title="platforms"
                    id="platforms"
                    className="selectPlatforms"
                    onChange={handleSelectPlatform}
                  >
                    <option value="" hidden="hidden">Platforms</option>
                    <option value="PC">PC</option>
                    <option value="IoS">IoS</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Ps4">Ps4</option>
                    <option value="Ps5">Ps5</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="N Switch">N Switch</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="selecteds">
              <div className="Splat">
                {form.platforms.map((platform) => (
                  <div key={platform} className="Sselecteds">
                    {platform}
                    <span
                      title="platform"
                      platformname={platform}
                      onClick={FilterSelected}
                      className="spam"
                    > x </span>
                  </div>
                ))}
              </div>
              <div className="Sgenre">
                {form.genres.map((genre) => (
                  <div key={genre.id} className="Sselecteds">
                    {genre.name}
                    <span
                      title="genre"
                      genreid={genre.id}
                      onClick={FilterSelected}
                      className="spam"
                    > x </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="Bttn-conteiner">
            <button type="submit" className="createBttn" onClick={sendInput}> Create </button>
          </div>
        </form>
        <div className="imgSearch">
          <img src={imageUrl} alt="games"></img>
        </div>
      </div>
    </div>
  );
};

export default Create;
