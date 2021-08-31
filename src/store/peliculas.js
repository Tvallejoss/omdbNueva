//Estados de las peliculas , tanto singular como Plural

import { createAction, createReducer } from "@reduxjs/toolkit"

export const setPeliculas = createAction("set_Peliculas")

export const peliculasReducer = createReducer([], {
    [setPeliculas]: (state, action) => action.payload

})

export const setPelicula = createAction("set_PeliculaSingular ")

export const peliculaReducer = createReducer("", {
    [setPelicula]: (state, action) => action.payload

})

