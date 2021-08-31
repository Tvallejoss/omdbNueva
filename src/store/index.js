//store configuracion
import { configureStore } from "@reduxjs/toolkit";
import { peliculaReducer, peliculasReducer } from "./peliculas";
import { usuarioReducer, favoritesReducer } from "./users";
const store = configureStore({
    reducer: {
        usuarioId: usuarioReducer,
        favorites: favoritesReducer,
        peliculas: peliculasReducer,
        peliculaSingural: peliculaReducer
    }

})

export default store