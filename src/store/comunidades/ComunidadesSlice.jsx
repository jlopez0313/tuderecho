import { createSlice } from '@reduxjs/toolkit';

export const comunidadesSlice = createSlice({
    name: 'comunidad',
    initialState: {
        comunidades: [],
        comunidad: {}
    },
    reducers: {
        set: ( state, data ) => {
            state.comunidades = data.payload;
        },
        comunidad: ( state, data ) => {
            state.comunidad = data.payload;
        }
    }
})

export const { set, comunidad } = comunidadesSlice.actions