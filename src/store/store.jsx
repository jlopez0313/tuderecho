import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./user/UserSlice"
import { comunidadesSlice } from "./comunidades/ComunidadesSlice"
import { conferenciasSlice } from "./conferencias/ConferenciasSlice"
import { videotecaSlice } from "./videoteca/VideotecaSlice"
import { chatSlice } from "./chat/ChatSlice"
import { settingsSlice } from "./settings/SettingsSlice"

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        chat: chatSlice.reducer,
        settings: settingsSlice.reducer,
        comunidad: comunidadesSlice.reducer,
        conferencia: conferenciasSlice.reducer,
        videoteca: videotecaSlice.reducer,
    }
})