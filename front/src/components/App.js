import React, { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/index.css";

import Pokemon from "./Pokemon.js";
import Player from "./Player.js";
import User from "./User.js";
import Favorites from "./Favorites.js";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [showPokemon, setShowPokemon] = useState(false);
  const [player, setPlayer] = useState([]);
  const [showTeam, setShowTeam] = useState(false);
  const [user, setUser] = useState("");
  const [showUserEnter, setShowUserEnter] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const _pokemon = await fetch("/pokemon").then((res) => res.json());
        setPokemon(_pokemon);
      } catch (err) {
        console.log("error ", err);
      }
    };
    getPokemon();
  }, []); // Only run the first time; fetches list of pokemon

  useEffect(() => {
    const getPlayer = async () => {
      console.log("getting player");
      try {
        const _player = await fetch("/player").then((res) => res.json());
        setPlayer(_player);
      } catch (err) {
        console.log("error ", err);
      }
    };
    getPlayer();
  }, []); // Only run the first time; fetches user's team

  useEffect(() => {
    const getFavorites = async () => {
      console.log("getting favorites");
      try {
        const _favorites = await fetch("/favorites").then((res) => res.json());
        setFavorites(_favorites);
      } catch (err) {
        console.log("error ", err);
      }
    };
    getFavorites();
  }, []); // Only run the first time; fetches user's team

  useEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); // Only run the first time; gets username

  function handleChange(username) {
    console.log(username);
    setUser(username);
    console.log("app: user changed");
    setShowTeam(true);
    setShowPokemon(false);
    setShowUserEnter(false);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/">
          <h1 className="navbar-brand-h1"><img
            src="./images/pika.png"
            alt="Pikachu"
            title="Pikachu"
            width="56"
            height="50"
          />PokeMongoDB</h1>
        </a>
        <a
          className="nav-item nav-link"
          href="teamEdit"
          onClick={(evt) => {
            evt.preventDefault();
            setShowTeam(true);
            setShowPokemon(false);
            setShowUserEnter(false);
            setShowFavorites(false);
          }}
        >
          Team Page<span className="sr-only">(current)</span>
        </a>
        <a
          className="nav-item nav-link"
          href="pokeList"
          onClick={(evt) => {
            evt.preventDefault();
            setShowPokemon(true);
            setShowTeam(false);
            setShowUserEnter(false);
            setShowFavorites(false);
          }}
        >
          Pokemon List<span className="sr-only">(current)</span>
        </a>
        <a
          className="nav-item nav-link"
          href="favoriteMon"
          onClick={(evt) => {
            evt.preventDefault();
            setShowTeam(false);
            setShowPokemon(false);
            setShowUserEnter(false);
            setShowFavorites(true);
          }}
        >
          Favorites
          <span className="sr-only">(current)</span>
        </a>
        <a
          className="nav-item active nav-link navbar-right"
          href="userlogin"
          onClick={(evt) => {
            evt.preventDefault();
            setShowTeam(false);
            setShowPokemon(false);
            setShowUserEnter(true);
            setShowFavorites(false);
          }}
        >
          Change User: {user}
          <span className="sr-only">(current)</span>
        </a>
      </nav>
      <br/>
      <div className="container text-left">
        <div className="row">
          <h1>Build Your Best Team!</h1>
        </div>
        <div className="row">
          {showUserEnter ? (
            <User handleChange={handleChange} player={player}></User>
          ) : (
            ""
          )}
          {showTeam ? (
            <Player player={player} pokemon={pokemon} user={user}></Player>
          ) : (
            ""
          )}
          {showPokemon ? (
            <Pokemon player={player} pokemon={pokemon} user={user}></Pokemon>
          ) : (
            ""
          )}
          {showFavorites ? (
            <Favorites favorites={favorites} pokemon={pokemon} user={user}></Favorites>
          ) : (
            ""
          )}
        </div>
        <br/>
        <div className="row">
          <footer>
            All character and image rights to Pokemon, Nintendo<br/>
            Webpage created by Alex Moeller and Ely Lam 2020{" "}
            <img
              src="./images/pokeball.png"
              alt="Pokeball"
              title="Pokeball"
              width="20"
              height="21"
            />
            <br/>
          </footer>
        </div>
        <br/>
      </div>
    </div>
  );
}

// Image from https://www.freeiconspng.com/img/45343

export default App;
