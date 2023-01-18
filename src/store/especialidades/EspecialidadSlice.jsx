import { createSlice } from '@reduxjs/toolkit';

export const especialidadSlice = createSlice({
    name: 'especialidad',
    initialState: {
        especialidades: [],
        especialidad: {}
    },
    reducers: {
        set: ( state, data ) => {
            state.especialidades = data.payload;
        },
        especialidad: ( state, data ) => {
            state.especialidad = data.payload;
        }
    }
})

export const { set, especialidad } = especialidadSlice.actions