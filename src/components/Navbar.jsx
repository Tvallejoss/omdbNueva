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
        axios
            .get(`https://www.omdbapi.com/?apikey=f0d06369=${pelicula}`)
            .then((data) => {
                dispatch(setPeliculas(data.data.Search));
            });
    }, [pelicula, favorites]);

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
    }, [usuarioId , favorites]);
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
                            <li onClick={logOut}>logout</li>
                            {location.pathname === "/" ? (
                                <Link
                                    to={`/profile/${usuarioId}`}
                                    style={{
                                        color: "#fff",
                                    }}
                                >
                                    <li>Profile</li>
                                </Link>
                            ) : (
                                <Link
                                    to="/"
                                    style={{
                                        color: "#fff",
                                    }}
                                >
                                    <li>Home</li>
                                </Link>
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
