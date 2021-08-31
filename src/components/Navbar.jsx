import React, { useEffect, useState } from "react";
import "../style/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase/base";
import axios from "axios";
import { setPeliculas } from "../store/peliculas";
import { setFavorites, setUsuariolog } from "../store/users";
import { Header } from "./components/Header";
import { PerfilScreen } from "./components/PerfilScreen";

export const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    let usuarioId = useSelector((state) => state.usuarioId);
    let favorites = useSelector((state) => state.favorites);
    const [usuarioLogueado, setUsuarioLogueado] = useState("");
    const [pelicula, setPelicula] = useState("");
    useEffect(() => {
        if (usuarioId) {
            db.collection("users")
                .doc(usuarioId)
                .get()
                .then((res) => {
                    setUsuarioLogueado(res.data());
                    dispatch(setFavorites(res.data().favoritesMovies));
                });
        }
        axios
            .get(`https://www.omdbapi.com/?apikey=20dac387&s=${pelicula}`)
            .then((data) => {
                dispatch(setPeliculas(data.data.Search));
            });
    }, [usuarioId, pelicula, favorites, dispatch]);

    const searchMovie = (e) => {
        if (e.keyCode === 13) {
            setPelicula(e.target.value);
            e.target.value = "";
        }
    };

    const logOut = () => {
        dispatch(setUsuariolog(""));
    };
    return (
        <div>
            <nav className="navigation">
                <ul>
                    <span className="logo">OMDB-Tomas Vallejos Semino</span>
                    {usuarioId ? (
                        <>
                            <li onClick={logOut}>Log0ut</li>
                            {location.pathname === "/" ? (
                                <Link
                                    to={`/profile/${usuarioId}`}
                                    style={{
                                        color: "#fff",
                                    }}
                                >
                                    <li>Profile</li>{" "}
                                </Link>
                            ) : (
                                ""
                            )}
                            <li>¡Hi {usuarioLogueado.name}!</li>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <li
                                    style={{
                                        color: "#fff",
                                    }}
                                >
                                    LogIn
                                </li>
                            </Link>
                            <li>¡Hi Stranger!</li>
                        </>
                    )}
                    <div className="wrap">
                        {location.pathname === "/" ? (
                            <div className="search">
                                <input
                                    type="text"
                                    className="searchTerm"
                                    placeholder="Search a movie"
                                    onKeyUp={searchMovie}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </ul>
            </nav>
            {location.pathname === "/" ? <Header /> : <PerfilScreen />}
        </div>
    );
};
