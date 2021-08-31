import { createAction, createReducer } from "@reduxjs/toolkit"

export const setUsuariolog = createAction("set_Usuariolog")

export const usuarioReducer = createReducer("", {
    [setUsuariolog]: (state, action) => action.payload
})


export const setFavorites = createAction("set_favorites")

export const favoritesReducer = createReducer("", {
    [setFavorites]: (state, action) => action.payload
})
