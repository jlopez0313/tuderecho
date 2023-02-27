import { configureStore } from "@reduxjs/toolkit"
import { conferenciaSlice } from "./conferencias/ConferenciaSlice"
import { especialidadSlice } from "./especialidades/EspecialidadSlice"
import { publicacionSlice } from "./publicaciones/PublicacionesSlice"
import { tagSlice } from "./tags/TagSlice"
import { userSlice } from "./user/UserSlice"
import { videotecaSlice } from "./videoteca/VideotecaSlice"

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        especialidad: especialidadSlice.reducer,
        tag: tagSlice.reducer,
        publicacion: publicacionSlice.reducer,
        conferencia: conferenciaSlice.reducer,
        videoteca: videotecaSlice.reducer,
    }
})