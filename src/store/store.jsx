import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./user/UserSlice"
import { comunidadesSlice } from "./comunidades/ComunidadesSlice"
import { conferenciasSlice } from "./conferencias/ConferenciasSlice"
import { videotecaSlice } from "./videoteca/VideotecaSlice"

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        comunidad: comunidadesSlice.reducer,
        conferencia: conferenciasSlice.reducer,
        videoteca: videotecaSlice.reducer,
    }
})