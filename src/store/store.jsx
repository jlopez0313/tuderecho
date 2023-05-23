import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./user/UserSlice"
import { comunidadesSlice } from "./comunidades/ComunidadesSlice"

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        comunidad: comunidadesSlice.reducer
    }
})