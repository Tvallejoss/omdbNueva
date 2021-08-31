import React, { useEffect, useState } from "react";
import "../style/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../firebase/base";
import axios from "axios";
import { setPeliculas } from "../store/peliculas";
import { setUsuariolog } from "../store/users";
import { CardMovie } from "./CardMovie";

export const Navbar = () => {
    const dispatch = useDispatch();
    let usuarioId = useSelector((state) => state.usuarioId);
    let peliculas = useSelector((state) => state.peliculas);
    const [usuarioLogueado, setUsuarioLogueado] = useState("");
    const [pelicula, setPelicula] = useState("");
    useEffect(() => {
        if (usuarioId) {
            db.collection("users")
                .doc(usuarioId)
                .get()
                .then((res) => {
                    setUsuarioLogueado(res.data());
                });
        }
        axios
            .get(`https://www.omdbapi.com/?apikey=20dac387&s=${pelicula}`)
            .then((data) => {
                dispatch(setPeliculas(data.data.Search));
            });
    }, [usuarioId, pelicula, dispatch]);

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
                            <li>Profile</li>
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
                        <div className="search">
                            <input
                                type="text"
                                className="searchTerm"
                                placeholder="Search a movie"
                                onKeyUp={searchMovie}
                            />
                        </div>
                    </div>
                </ul>
            </nav>
            <div
                id="header"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    paddingTop: "150px",
                }}
            >
                {peliculas.length
                    ? peliculas.map((pelicula, i) => {
                          return (
                              <div
                                  key={i}
                                  style={{
                                      margin: "35px",
                                  }}
                              >
                                  <CardMovie props={pelicula} />
                              </div>
                          );
                      })
                    : ""}
            </div>
        </div>
    );
};
