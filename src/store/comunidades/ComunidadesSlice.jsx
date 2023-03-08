import { createSlice } from '@reduxjs/toolkit';

export const comunidadesSlice = createSlice({
    name: 'comunidad',
    initialState: {
        comunidades: [],
        comunidad: {},
        isLoading: false,
    },
    reducers: {
        set: ( state, data ) => {
            state.comunidades = data.payload;
        },
        setLoading: ( state, data ) => {
            state.isLoading = data.payload;
        },
        comunidad: ( state, data ) => {
            state.comunidad = data.payload;
        }
    }
})

export const { set, comunidad, setLoading } = comunidadesSlice.actions