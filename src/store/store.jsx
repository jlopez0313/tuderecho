import { configureStore } from "@reduxjs/toolkit"
import { especialidadSlice } from "./especialidades/EspecialidadSlice"
import { tagSlice } from "./tags/TagSlice"
import { userSlice } from "./user/UserSlice"

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        especialidad: especialidadSlice.reducer,
        tag: tagSlice.reducer,
    }
})