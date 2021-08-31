import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../style/cardMovie.css";
import { db } from "../firebase/base";
import firebase from "firebase/app";
import "firebase/firestore";
export const CardMovie = ({ props }) => {
    let usuarioId = useSelector((state) => state.usuarioId);
    let favorites = useSelector((state) => state.favorites);

    const addOrRemoveFavorites = () => {
        if (usuarioId) {
            if (!favorites.includes(props.Title)) {
                db.collection("users")
                    .doc(usuarioId)
                    .update({
                        favoritesMovies:
                            firebase.firestore.FieldValue.arrayUnion(
                                props.Title
                            ),
                    });
            } else {
                db.collection("users")
                    .doc(usuarioId)
                    .update({
                        favoritesMovies:
                            firebase.firestore.FieldValue.arrayRemove(
                                props.Title
                            ),
                    });
            }
        }
    };

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img
                        src={props.Poster}
                        alt="Poster"
                        style={{
                            width: "270px",
                            height: "450px",
                            border: "2px solid black",
                            boxShadow: "15px 2px 35px 9px rgba(0,0,0,0.85)",
                            WebkitBoxShadow:
                                "15px 2px 35px 9px rgba(0,0,0,0.85)",
                            MozBoxShadow: "15px 2px 35px 9px rgba(0,0,0,0.85),",
                        }}
                    />
                </div>
                <div className="flip-card-back">
                    <h1>{props.Title}</h1>
                    <p>{props.Type}</p>
                    <p>{props.Year}</p>
                    <p>Favorites</p>
                    {favorites.includes(props.Title) ? (
                        <svg
                            onClick={addOrRemoveFavorites}
                            className="svg-icon"
                            viewBox="0 0 20 20"
                            style={{
                                height: "30px",
                            }}
                        >
                            <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
                        </svg>
                    ) : (
                        <svg
                            onClick={addOrRemoveFavorites}
                            className="svg-icon"
                            viewBox="0 0 20 20"
                            style={{
                                height: "30px",
                            }}
                        >
                            <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};
