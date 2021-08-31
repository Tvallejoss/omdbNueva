//store configuracion
import { configureStore } from "@reduxjs/toolkit";
import { peliculaReducer, peliculasReducer } from "./peliculas";
import { usuarioReducer } from "./users";
const store = configureStore({
    reducer: {
        usuarioId: usuarioReducer,
        peliculas: peliculasReducer,
        peliculaSingural: peliculaReducer
    }

})

export default store